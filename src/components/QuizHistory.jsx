import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const QuizHistory = () => {
  const { attempts, quizzes } = useQuiz();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Quiz History</h1>
      {attempts.length === 0 ? (
        <p>No attempts recorded.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attempts.map((attempt, index) => {
            const quiz = quizzes.find((q) => q.id === attempt.quizId);
            return (
              <div key={index} className="p-4 bg-white shadow rounded-lg">
                <h2 className="font-semibold text-xl">
                  {quiz?.title || "Unknown Quiz"}
                </h2>
                <p className="mt-2">
                  Score: {attempt.score} / {attempt.total}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(attempt.date).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default QuizHistory;
