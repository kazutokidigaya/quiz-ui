import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CreateQuiz from "./components/CreateQuiz";
import AttemptQuiz from "./components/AttemptQuiz";
import QuizHistory from "./components/QuizHistory";
import ResultComponent from "./components/ResultComponent";
import Footer from "./components/Footer";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className=" flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600">
          <div className="flex flex-col min-h-screen justify-between bg-white">
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-quiz" element={<CreateQuiz />} />
                <Route path="/attempt-quiz/:quizId" element={<AttemptQuiz />} />
                <Route path="/quiz-history" element={<QuizHistory />} />
                <Route path="/quiz/result" element={<ResultComponent />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
