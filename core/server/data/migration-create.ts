import { writeFileSync } from "fs";
import { resolve } from "path";

let args = process.argv.slice(2);

// if not only 1 arg
if (args.length !== 1) {
  console.log(`Usage: yarn migrate:create [migration_name]`);
  process.exit(0);
}

const filename = `${Date.now()}-${args[0]}.ts`;

const template = `
import { Pool } from "pg";

export async function up(database: Pool) {
    // Place code here for applying the change
}

export async function down(database: Pool) {
    // Place code here for rolling back the change
}
`;

writeFileSync(
  resolve(__dirname, "../../../src/migrations/", filename),
  template
);
