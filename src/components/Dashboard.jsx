import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPlus, FaHistory, FaHome } from "react-icons/fa";

const Dashboard = () => {
  const { quizzes } = useQuiz();
  const navigate = useNavigate();

  return (
    <div className=" p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition duration-300 flex items-center gap-2 cursor-pointer"
          >
            <FaHome /> Home
          </button>
        </div>
        <div className="flex flex-wrap gap-6 mb-8">
          <button
            onClick={() => navigate("/create-quiz")}
            className="bg-green-500 text-white px-8 py-4 rounded-full shadow hover:bg-green-600 transition duration-300 flex items-center gap-2 cursor-pointer"
          >
            <FaPlus /> Create Quiz
          </button>
          <button
            onClick={() => navigate("/quiz-history")}
            className="bg-blue-500 text-white px-8 py-4 rounded-full shadow hover:bg-blue-600 transition duration-300 flex items-center gap-2 cursor-pointer"
          >
            <FaHistory /> Quiz History
          </button>
        </div>
        {quizzes.length === 0 ? (
          <p className="text-lg text-gray-700">
            No quizzes available. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                  {quiz.title}
                </h2>
                <p className="text-gray-600 mb-4">{quiz.description}</p>
                <button
                  onClick={() => navigate(`/attempt-quiz/${quiz.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <FaPlay /> Attempt
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
