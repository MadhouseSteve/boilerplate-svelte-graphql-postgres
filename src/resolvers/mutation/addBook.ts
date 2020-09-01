import { pubsub, BOOK_ADDED } from "../../../core/server/graphql/resolvers";

interface Args {
  title: string;
  author: string;
}

export default (_: any, args: Args, ctx: any) => {
  let book = {
    title: args.title,
    author: args.author,
  };

  ctx.database.connection.query("insert into books values ($1, $2)", [
    args.title,
    args.author,
  ]);

  pubsub.publish(BOOK_ADDED, { bookAdded: book });
  return book;
};
