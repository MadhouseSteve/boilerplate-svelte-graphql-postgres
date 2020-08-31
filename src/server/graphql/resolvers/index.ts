import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();
const BOOK_ADDED = "BOOK_ADDED";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: (_a, _b, ctx) => {
      console.log(ctx.database);
      return books;
    },
  },
  Mutation: {
    addBook: () => {
      let book = {
        title: "A",
        author: "B",
      };
      pubsub.publish(BOOK_ADDED, { bookAdded: book });
      return book;
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator([BOOK_ADDED]) },
  },
};

export default resolvers;
