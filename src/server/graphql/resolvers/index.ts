import { PubSub } from "apollo-server-express";
import { readdirSync } from "fs";
import { resolve, basename } from "path";

export const pubsub = new PubSub();
export const BOOK_ADDED = "BOOK_ADDED";

let Query = {};
for (let query of readdirSync(resolve(__dirname, "./query"))) {
  Query[
    basename(basename(query, ".ts"), ".js")
  ] = require(`./query/${query}`).default;
}

let Mutation = {};
for (let mutation of readdirSync(resolve(__dirname, "./mutation"))) {
  Mutation[
    basename(basename(mutation, ".ts"), ".js")
  ] = require(`./mutation/${mutation}`).default;
}

let Subscription = {};
for (let subscription of readdirSync(resolve(__dirname, "./subscription"))) {
  Subscription[
    basename(basename(subscription, ".ts"), ".js")
  ] = require(`./subscription/${subscription}`).default;
}

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

export default resolvers;
