import { SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";

import { UserParams, DietParams, ProfileParams } from "@/constants/Interfaces";

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
        id            INTEGER   NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id       INTEGER   NOT NULL,
        name          TEXT      NOT NULL,
        date_of_birth TEXT,
        gender        TEXT,
        height        REAL,
        weight        REAL,
        updated_at    TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      CREATE TABLE IF NOT EXISTS user_diet (
        id              INTEGER   NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id         INTEGER   NOT NULL,
        activity_level  TEXT,
        health_goal     TEXT,
        updated_at      TEXT      NOT NULL  DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );

      CREATE TABLE IF NOT EXISTS user_intake_limit (
        id              INTEGER   NOT NULL  PRIMARY KEY AUTOINCREMENT,
        user_id         INTEGER   NOT NULL,
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

export const getUserID = async (db: SQLiteDatabase, email: string) => {
  return await db.getFirstAsync<{ user_id: number }>("SELECT user_id FROM users WHERE email = ?", [email]);
}

export const isUserExist = async (db: SQLiteDatabase, email: string) => {
  return await db.getFirstAsync("SELECT * FROM users WHERE email = ?", [email]);
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
    console.log("🚀 ~ isUserProfileComplete ~ error:", error)

    return false;
  }
}

export const createUser = async (db: SQLiteDatabase, email: string, password: string, isOAuth: number) => {
  if (password === "") {
    password = "OAuth";
  }

  return db.runAsync("INSERT INTO users (email, password, isOAuth) VALUES (?, ?, ?);", [email, password, isOAuth]);
};

export const fetchUserProfile = async (db: SQLiteDatabase, email: string): Promise<ProfileParams> => {
  const result = await db.getFirstAsync<ProfileParams>("SELECT * FROM user_profile up JOIN users u ON up.user_id = u.user_id WHERE u.email = ?", [email]);

  return result ?? {
    id: 0,
    user_id: 0,
    name: "",
    date_of_birth: "",
    gender: "",
    height: 0,
    weight: 0,
    updated_at: "",
  };
};


export const createUserProfile = async (db: SQLiteDatabase, email: string, params: ProfileParams) => {
  const { name, date_of_birth, gender, height, weight } = params;

  try {
    const userID = await getUserID(db, email);

    if (!userID) {
      throw new Error("User does not exist");
    }

    return db.runAsync("INSERT INTO user_profile (user_id, name, date_of_birth, gender, height, weight) VALUES (?, ?, DATE(?), ?, ?, ?);",
      [userID?.user_id, name, date_of_birth, gender, height, weight]);
  } catch (error) {
    console.log("🚀 ~ createUserProfile ~ error:", error)

    return false;
  }
};

export const createUserDietInfo = async (db: SQLiteDatabase, email: string, params: DietParams) => {
  const { activity_level, health_goal } = params;

  try {
    const userID = await getUserID(db, email);

    if (!userID) {
      throw new Error("User does not exist");
    }

    return db.runAsync("INSERT INTO user_diet (user_id, activity_level, health_goal) VALUES (?, ?, ?);",
      [userID?.user_id, activity_level, health_goal]);
  } catch (error) {
    console.log("🚀 ~ createUserDietInfo ~ error:", error)

    return false;
  }
}


export const updateUser = async (db: SQLiteDatabase, params: UserParams) => {
  const { user_id, email, password, isOAuth } = params;

  return db.runAsync("UPDATE users SET email = ?, password = ?, isOAuth = ? WHERE user_id = ?", [email, password, isOAuth, user_id as number]);
}

export const updateUserProfile = async (db: SQLiteDatabase, email: string, params: ProfileParams) => {
  const { name, date_of_birth, gender, height, weight } = params;

  try {
    const userID = await getUserID(db, email);

    if (!userID) {
      throw new Error("User does not exist");
    }

    return db.runAsync("UPDATE user_profile SET name = ?, date_of_birth = DATE(?), gender = ?, height = ?, weight = ? WHERE user_id = ?", [name, date_of_birth, gender, height, weight]);
  } catch (error) {
    console.log("🚀 ~ updateUserProfile ~ error:", error)

    return false;
  }
}

export const updateUserDietInfo = async (db: SQLiteDatabase, email: string, params: DietParams) => {
  const { activity_level, health_goal } = params;

  try {
    const userID = await getUserID(db, email);

    if (!userID) {
      throw new Error("User does not exist");
    }

    return db.runAsync("UPDATE user_diet SET activity_level = ?, health_goal = ? WHERE user_id = ?", [activity_level, health_goal, userID?.user_id]);
  } catch (error) {
    console.log("🚀 ~ updateUserDietInfo ~ error:", error)

    return false;
  }
}