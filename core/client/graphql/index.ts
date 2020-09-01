import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { OperationDefinitionNode } from "graphql";

const ws = new WebSocketLink({
  uri: "ws://localhost:3000/graphql",
  reconnect: true,
});

const http = new HttpLink({ uri: "http://localhost:3000/graphql" });

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query) as OperationDefinitionNode;
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  ws,
  http
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export type GraphQL = ApolloClient<InMemoryCache>;
