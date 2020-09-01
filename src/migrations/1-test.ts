import { Pool } from "pg";

export async function up(database: Pool) {
  await database.query(
    "create table books (title varchar(50), author varchar(50))"
  );
  await database.query("insert into books values ($1, $2)", [
    "Harry Potter and the Chamber of Secrets",
    "J.K. Rowling",
  ]);
  await database.query("insert into books values ($1, $2)", [
    "Jurassic Park",
    "Michael Crichton",
  ]);
}

export async function down(database: Pool) {
  database.query("drop table books");
}
