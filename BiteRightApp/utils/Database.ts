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
        isOAuth     INTEGER   NOT NULL  DEFAULT 0,
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
        updated_at    TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      CREATE TABLE IF NOT EXISTS user_diet (
        user_id         INTEGER   NOT NULL  PRIMARY KEY,
        lifestyle       TEXT,
        activity_level  TEXT,
        health_goal     TEXT,
        updated_at      TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      CREATE TABLE IF NOT EXISTS user_intake_limit (
        user_id         INTEGER   NOT NULL  PRIMARY KEY,
        calories        REAL,
        carbohydrates   REAL,
        sugar           REAL,
        fats            REAL,
        protein         REAL,
        updated_at      TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP,

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

    console.log(initResult);
    currentDBVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export const showUsers = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM users");
}

export const isUserExist = async (db: SQLiteDatabase, email: string) => {
  return db.getFirstAsync("SELECT * FROM users WHERE email = ?", [email]);
};

export const isUserProfileComplete = async (db: SQLiteDatabase, email: string) => {
  const query = `
    SELECT *
    FROM user_profile up
    JOIN users u ON up.user_id = u.user_id
    WHERE u.email = ?
  `;

  try {
    const result = await db.getFirstAsync(query, [email]);

    return !!result;
  } catch (error) {
    console.log(error);

    return false;
  }
}

export const createUser = async (db: SQLiteDatabase, email: string, password: string, isOAuth: number) => {
  if (password === "") {
    password = "OAuth";
  }

  return db.runAsync("INSERT INTO users (email, password, isOAuth) VALUES (?, ?, ?)", [email, password, isOAuth]);
};