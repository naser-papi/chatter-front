import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: import.meta.env.VITE_BACKEND_URL,
});

export default apolloClient;
