import { PubSub } from "apollo-server-express";

import booksQuery from "./query/books";
import booksMigration from "./migration/books";
import booksSubscription from "./subscription/books";

export const pubsub = new PubSub();
export const BOOK_ADDED = "BOOK_ADDED";

const resolvers = {
  Query: {
    books: booksQuery,
  },
  Mutation: {
    addBook: booksMigration,
  },
  Subscription: {
    bookAdded: booksSubscription,
  },
};

export default resolvers;
