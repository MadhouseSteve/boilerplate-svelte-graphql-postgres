import { config } from "dotenv";
config();

import { createServer } from "http";
import { AddressInfo } from "net";
import graphql from "./graphql";
import app from "./express";
import startSubscription from "./graphql/subscription";
import database from "./data";

// Add graphql HTTP requests to express
graphql.applyMiddleware({ app });

// Start the HTTP server
const server = createServer(app);
server.listen({ port: 3000, host: "localhost" }, () => {
  const address = server.address() as AddressInfo;
  console.log(`Listening on: http://${address.address}:${address.port}`);

  // Attach the subscription server
  startSubscription(server);
});
