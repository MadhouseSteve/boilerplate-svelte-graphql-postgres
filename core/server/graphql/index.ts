import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";

import database from "../data";

// Define the GraphQL application
export default new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: () => {
    return { database };
  },
});
