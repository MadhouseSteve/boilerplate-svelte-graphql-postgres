import { PubSub } from "apollo-server-express";
import { readdirSync } from "fs";
import { resolve, basename } from "path";

export const pubsub = new PubSub();
export const BOOK_ADDED = "BOOK_ADDED";

const basePath = resolve(__dirname, "../../../src/resolvers");

let Query = {};
for (let query of readdirSync(resolve(`${basePath}/query`))) {
  Query[
    basename(basename(query, ".ts"), ".js")
  ] = require(`${basePath}/query/${query}`).default;
}

let Mutation = {};
for (let mutation of readdirSync(resolve(`${basePath}/mutation`))) {
  Mutation[
    basename(basename(mutation, ".ts"), ".js")
  ] = require(`${basePath}/mutation/${mutation}`).default;
}

let Subscription = {};
for (let subscription of readdirSync(resolve(`${basePath}/subscription`))) {
  Subscription[
    basename(basename(subscription, ".ts"), ".js")
  ] = require(`${basePath}/subscription/${subscription}`).default;
}

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

export default resolvers;
