import Dexie from "dexie";

// Create a new Dexie database
export const db = new Dexie("QuizPlatformDB");

// Define your database schema
db.version(1).stores({
  attempts: "++id, quizId, score, total, date",
  quizzes: "++id, title, description, questions",
});

export default db;
