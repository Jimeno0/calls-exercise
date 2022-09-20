import {
  ApolloProvider as ApolloProviderComponent,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

import { API_URL } from "../constants";
import { localStorageManager } from "../core";

type ApolloClientProps = {
  children: React.ReactNode;
};

const httpLink = new HttpLink({ uri: API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const operationName = operation.operationName;
    const isRefreshMutation = operationName === "RefreshToken";
    const token = isRefreshMutation
      ? localStorageManager.get("refresh_token")
      : localStorageManager.get("access_token");
    const bearer = token ? `Bearer ${token}` : "";
    return {
      headers: {
        ...headers,
        authorization: bearer,
      },
    };
  });

  return forward(operation);
});

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export const ApolloProvider = ({ children }: ApolloClientProps) => {
  return (
    <ApolloProviderComponent client={client}>
      {children}
    </ApolloProviderComponent>
  );
};
