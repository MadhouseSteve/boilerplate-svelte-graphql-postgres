import { pubsub, BOOK_ADDED } from "..";

export default { subscribe: () => pubsub.asyncIterator([BOOK_ADDED]) };
