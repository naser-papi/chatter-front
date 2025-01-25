import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { OperationDefinitionNode } from "graphql/language";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_BACKEND_WS,
  }),
);

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(
      query,
    ) as OperationDefinitionNode;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default apolloClient;
