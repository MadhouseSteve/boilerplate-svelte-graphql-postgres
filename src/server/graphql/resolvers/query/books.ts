export default async (_a: any, _b: any, ctx: any) => {
  return (await ctx.database.connection.query("select * from books")).rows;
};
