import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderComponent,
} from "@apollo/client";
import { API_URL } from "../constants";

type ApolloClientProps = {
  children: React.ReactNode;
};

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: ApolloClientProps) => {
  return (
    <ApolloProviderComponent client={client}>
      {children}
    </ApolloProviderComponent>
  );
};
