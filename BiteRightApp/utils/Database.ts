import { SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";

export async function migrateDBIfNeeded(db: SQLiteDatabase) {
  console.log(FileSystem.documentDirectory);

  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  let currentDBVersion = result?.user_version ?? 0;

  if (currentDBVersion >= DATABASE_VERSION) {
    console.log("Database is up to date");

    return;
  }

  if (currentDBVersion === 0) {
    const initResult = await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS users (
        user_id     INTEGER   NOT NULL  PRIMARY KEY AUTOINCREMENT,
        email       TEXT      NOT NULL,
        password    TEXT      NOT NULL,
        created_at  TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP,
        updated_at  TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_profile (
        user_id       INTEGER   NOT NULL  PRIMARY KEY,
        name          TEXT      NOT NULL,
        date_of_birth TEXT,
        gender        TEXT,
        height        REAL,
        weight        REAL,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      CREATE TABEL IF NOT EXISTS user_diet (
        user_id         INTEGER   NOT NULL  PRIMARY KEY,
        lifestyle       TEXT,
        activity_level  TEXT,
        health_goal     TEXT,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      CREATE TABLE IF NOT EXISTS user_intake_limit (
        user_id         INTEGER   NOT NULL  PRIMARY KEY,
        calories        REAL,
        carbohydrates   REAL,
        sugar           REAL,
        fats            REAL,
        protein         REAL,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
      
      CREATE TABLE IF NOT EXISTS consumption_history (
        history_id      INTEGER   NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id         INTEGER   NOT NULL,
        consumed_at     TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP,
        food_id         INTEGER   NOT NULL,
        food_image      TEXT,
        food_name       TEXT,
        calories        REAL,
        carbohydrates   REAL,
        sugar           REAL,
        fats            REAL,
        protein         REAL,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `);

    currentDBVersion = 1;
    console.log(initResult);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}