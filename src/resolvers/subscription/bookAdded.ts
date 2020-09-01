import { pubsub, BOOK_ADDED } from "../../../core/server/graphql/resolvers";

export default { subscribe: () => pubsub.asyncIterator([BOOK_ADDED]) };
