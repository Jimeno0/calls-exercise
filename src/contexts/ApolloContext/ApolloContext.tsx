import {
  ApolloProvider as ApolloProviderComponent,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  split,
} from "@apollo/client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { localStorageManager } from "core";

type ApolloClientProps = {
  children: React.ReactNode;
};

const API_URL = process.env.REACT_APP_GRAPHQL_URI as string;
const API_SOCKET = process.env.REACT_APP_GRAPHQL_SOCKET as string;

const httpLink = new HttpLink({ uri: API_URL });

const wsLink = new WebSocketLink(
  new SubscriptionClient(API_SOCKET, {
    reconnect: true,
    connectionParams: () => ({
      authorization: `Bearer ${localStorageManager.get("access_token")}`,
    }),
  })
);
console.log({ wsLink });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const operationName = operation.operationName;
    const isRefreshMutation = operationName === "RefreshToken";
    const isLoginMutation = operationName === "Login";

    const token = isRefreshMutation
      ? localStorageManager.get("refresh_token")
      : localStorageManager.get("access_token");
    const bearer = !isLoginMutation && token ? `Bearer ${token}` : "";
    return {
      headers: {
        ...headers,
        authorization: bearer,
      },
    };
  });

  return forward(operation);
});

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  link: concat(authMiddleware, splitLink),
});

export const ApolloProvider = ({ children }: ApolloClientProps) => {
  return (
    <ApolloProviderComponent client={client}>
      {children}
    </ApolloProviderComponent>
  );
};
