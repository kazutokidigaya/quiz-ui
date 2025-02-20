import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ResultComponent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { score, total, answersDetails } = state || {};
  console.log({ answersDetails });
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center mb-6 text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
          Quiz Completed!
        </h1>
        <p className="text-2xl mb-6 text-center">
          Your Score: {score} out of {total}
        </p>

        <div className="space-y-6">
          {answersDetails.map((detail, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  Q{index + 1}: {detail.questionText}
                </h2>
                <p>
                  <span className="font-medium">Your Answer:</span>{" "}
                  {detail.selectedAnswer}
                </p>
                <p>
                  <span className="font-medium">Correct Answer:</span>{" "}
                  {detail.correctAnswer}
                </p>
              </div>
              <div
                className={`mt-4 sm:mt-0 text-2xl font-bold ${
                  detail.isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {detail.isCorrect ? "✓" : "✕"}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;
