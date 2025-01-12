import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

export default apolloClient;
