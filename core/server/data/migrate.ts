import { config } from "dotenv";
config();

import { resolve } from "path";
import { readdirSync } from "fs";
import database from "./index";

const baseDir = resolve(__dirname, "../../../src/migrations");

interface Migration {
  version: number;
  file: string;
  applied: string;
}

async function createMigrationsTable() {
  await database.connection.query(
    "create table if not exists migrations (version int, file varchar(50), applied timestamp)"
  );
}

async function getMigrationsList(): Promise<Migration[]> {
  return (await database.connection.query("select * from migrations")).rows;
}

function calculateMigrationsToRun(
  existing: Migration[],
  all: string[],
  direction: string,
  version: number
) {
  let toRun: string[];
  if (direction == "UP") {
    const existingList = existing.map((m) => m.file);
    toRun = all.filter((migration) => !existingList.includes(migration));
  } else {
    const existingList = existing
      .filter((m) => m.version === version)
      .map((m) => m.file);
    toRun = all.filter((migration) => existingList.includes(migration));
  }

  return toRun;
}

async function applyMigrations(
  toRun: string[],
  direction: string,
  version: number
) {
  for (let migrationFile of toRun) {
    console.log(`Applying ${migrationFile}`);

    const migration = require(`${baseDir}/${migrationFile}`);
    if (direction === "UP") {
      await migration.up(database.connection);
      await database.connection.query(
        "insert into migrations values ($1, $2, CURRENT_TIMESTAMP)",
        [version, migrationFile]
      );
    } else {
      await migration.down(database.connection);
      await database.connection.query("delete from migrations where file=$1", [
        migrationFile,
      ]);
    }
  }
}

async function run() {
  await createMigrationsTable();

  let direction = "UP";
  if (process.argv.pop().toUpperCase() === "DOWN") {
    direction = "DOWN";
  }
  const existingMigrations = await getMigrationsList();
  const lastVersion = existingMigrations.reduce(
    (v, m) => Math.max(m.version, v),
    0
  );
  const allMigrations = readdirSync(baseDir)
    .filter((file) => file !== "index.ts")
    .sort((a, b) => +a.split("-")[0] - +b.split("-")[0]);
  const runMigrations = calculateMigrationsToRun(
    existingMigrations,
    allMigrations,
    direction,
    lastVersion
  );

  if (runMigrations.length === 0) {
    console.log("No new migrations found.");
  } else {
    const targetVersion = direction == "UP" ? lastVersion + 1 : lastVersion - 1;
    await applyMigrations(runMigrations, direction, targetVersion);

    console.log(`Migration complete. Now at version ${targetVersion}.`);
  }
  await database.connection.end();
}

(async () => run())();
