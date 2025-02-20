import React, { createContext, useContext, useEffect, useState } from "react";
import db from "../indexedDb/db";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState(() => {
    const stored = localStorage.getItem("quizzes");
    return stored ? JSON.parse(stored) : [];
  });
  const [attempts, setAttempts] = useState([]);

  // Load attempts from IndexedDB on mount
  useEffect(() => {
    db.attempts.toArray().then((data) => setAttempts(data));
  }, []);

  // Persist quizzes in localStorage for simplicity
  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const addQuiz = (quiz) => setQuizzes((prev) => [...prev, quiz]);

  const addAttempt = async (attempt) => {
    const id = await db.attempts.add(attempt);
    setAttempts((prev) => [...prev, { id, ...attempt }]);
  };

  return (
    <QuizContext.Provider value={{ quizzes, addQuiz, attempts, addAttempt }}>
      {children}
    </QuizContext.Provider>
  );
};
