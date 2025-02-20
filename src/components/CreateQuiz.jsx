import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { toast } from "react-toastify";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { addQuiz } = useQuiz();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const handleAddQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionType: "multiple", // default to multiple choice
          questionText: "",
          options: ["", "", "", ""],
          correctOption: 0,
          answer: "", // for integer type
        },
      ],
    }));
  };

  const handleCreateQuiz = () => {
    if (!quizData.title || quizData.questions.length === 0) {
      toast.error("Please provide a quiz title and at least one question.");
      return;
    }
    addQuiz({ ...quizData, id: Date.now().toString() });
    toast.success("Quiz created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Create Quiz</h1>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
        className="w-full p-4 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        placeholder="Quiz Description"
        value={quizData.description}
        onChange={(e) =>
          setQuizData({ ...quizData, description: e.target.value })
        }
        className="w-full p-4 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {quizData.questions.map((q, i) => (
        <div key={i} className="p-6 mb-6 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Question {i + 1}</h2>
            <select
              value={q.questionType}
              onChange={(e) => {
                const updated = [...quizData.questions];
                updated[i].questionType = e.target.value;
                setQuizData({ ...quizData, questions: updated });
              }}
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="multiple">Multiple Choice</option>
              <option value="integer">Integer Answer</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Question Text"
            value={q.questionText}
            onChange={(e) => {
              const updated = [...quizData.questions];
              updated[i].questionText = e.target.value;
              setQuizData({ ...quizData, questions: updated });
            }}
            className="w-full p-4 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {q.questionType === "multiple" ? (
            <>
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  placeholder={`Option ${"ABCD"[j]}`}
                  value={opt}
                  onChange={(e) => {
                    const updated = [...quizData.questions];
                    updated[i].options[j] = e.target.value;
                    setQuizData({ ...quizData, questions: updated });
                  }}
                  className="w-full p-4 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
              <div>
                <label className="mr-4">Correct Option Index (0-3):</label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={q.correctOption}
                  onChange={(e) => {
                    const updated = [...quizData.questions];
                    updated[i].correctOption = parseInt(e.target.value);
                    setQuizData({ ...quizData, questions: updated });
                  }}
                  className="w-20 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block mb-2 font-semibold">
                Correct Answer (Integer):
              </label>
              <input
                type="number"
                placeholder="Enter answer"
                value={q.answer}
                onChange={(e) => {
                  const updated = [...quizData.questions];
                  updated[i].answer = e.target.value;
                  setQuizData({ ...quizData, questions: updated });
                }}
                className="w-full p-4 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-6">
        <button
          onClick={handleAddQuestion}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-300 cursor-pointer"
        >
          Add Question
        </button>
        <button
          onClick={handleCreateQuiz}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
