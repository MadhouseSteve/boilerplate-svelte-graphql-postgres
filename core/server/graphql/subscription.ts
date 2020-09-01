import { makeExecutableSchema } from "apollo-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { Server } from "http";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";

export default function startSubscription(httpServer: Server) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const options = { schema, execute, subscribe };

  SubscriptionServer.create(options, { server: httpServer, path: "/graphql" });
}
