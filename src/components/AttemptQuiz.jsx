import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { toast } from "react-toastify";

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizzes, addAttempt } = useQuiz();
  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [integerAnswer, setIntegerAnswer] = useState("");
  const [answersDetails, setAnswersDetails] = useState([]);

  useEffect(() => {
    if (!quiz) return;
    if (timeLeft <= 0) {
      // When time expires, if no answer was selected, record it as "No Answer"
      if (selectedOption === null) {
        const skippedDetail = {
          questionText: quiz.questions[currentQuestionIndex].questionText,
          questionType: quiz.questions[currentQuestionIndex].questionType,
          selectedAnswer: "No Answer",
          correctAnswer:
            quiz.questions[currentQuestionIndex].questionType === "multiple"
              ? quiz.questions[currentQuestionIndex].options[
                  quiz.questions[currentQuestionIndex].correctOption
                ]
              : quiz.questions[currentQuestionIndex].answer,
          isCorrect: false,
        };
        const newDetails = [...answersDetails, skippedDetail];
        setAnswersDetails(newDetails);
        toast.error("Time's up! Question skipped.");
        handleNextQuestion(score, newDetails);
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [
    timeLeft,
    quiz,
    currentQuestionIndex,
    selectedOption,
    answersDetails,
    score,
  ]);

  if (!quiz)
    return <div className="p-6 text-center text-xl">Quiz not found.</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (optionIndex = null) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    let isCorrect = false;
    let userAnswer;
    if (currentQuestion.questionType === "multiple") {
      setSelectedOption(optionIndex);
      isCorrect = optionIndex === currentQuestion.correctOption;
      userAnswer = currentQuestion.options[optionIndex];
    } else {
      isCorrect = parseInt(integerAnswer) === parseInt(currentQuestion.answer);
      userAnswer = integerAnswer;
    }

    const answerDetail = {
      questionText: currentQuestion.questionText,
      questionType: currentQuestion.questionType,
      selectedAnswer: userAnswer,
      correctAnswer:
        currentQuestion.questionType === "multiple"
          ? currentQuestion.options[currentQuestion.correctOption]
          : currentQuestion.answer,
      isCorrect,
    };

    // Create a local copy of answersDetails including this answer
    const newAnswersDetails = [...answersDetails, answerDetail];
    setAnswersDetails(newAnswersDetails);

    let updatedScore = score;
    if (isCorrect) {
      updatedScore = score + 1;
      setScore(updatedScore);
      toast.success("Correct Answer!");
    } else {
      toast.error("Wrong Answer!");
    }
    setFeedback(isCorrect ? "correct" : "wrong");

    // Delay moving to the next question so the user sees the feedback
    setTimeout(() => {
      handleNextQuestion(updatedScore, newAnswersDetails);
    }, 1000);
  };

  // Accept updatedScore and newAnswers (a local copy) as parameters
  const handleNextQuestion = (updatedScore, newAnswers = answersDetails) => {
    setSelectedOption(null);
    setFeedback(null);
    setTimeLeft(30);
    setIntegerAnswer("");
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Save the attempt and navigate to the result page
      addAttempt({
        quizId,
        score: updatedScore,
        total: quiz.questions.length,
        date: new Date().toISOString(),
        details: newAnswers,
      });
      navigate("/quiz/result", {
        state: {
          score: updatedScore,
          total: quiz.questions.length,
          answersDetails: newAnswers,
        },
      });
    }
  };

  // Calculate progress bar width (0 to 100%)
  const progressWidth = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-blue-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </h1>
          <div className="w-32">
            <div className="w-full bg-gray-300 h-2 rounded">
              <div
                className="bg-blue-500 h-2 rounded transition-all duration-300"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
            <div className="text-center text-sm mt-1">{timeLeft}s</div>
          </div>
        </div>

        {feedback && (
          <div
            className={`mb-4 text-2xl font-bold text-center ${
              feedback === "correct" ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback === "correct" ? "Correct!" : "Wrong!"}
          </div>
        )}

        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {currentQuestion?.questionText}
        </h2>

        {currentQuestion.questionType === "multiple" ? (
          <ul className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswer(index)}
                className={`border p-4 rounded-md cursor-pointer transition-colors duration-300 
                  ${
                    selectedOption === index && feedback === "correct"
                      ? "bg-green-200"
                      : selectedOption === index && feedback === "wrong"
                      ? "bg-red-200"
                      : "hover:bg-gray-100"
                  }`}
              >
                {option}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center">
            <input
              type="number"
              placeholder="Enter your answer"
              value={integerAnswer}
              onChange={(e) => setIntegerAnswer(e.target.value)}
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (integerAnswer === "") {
                    toast.error("Please enter an answer or choose to skip.");
                  } else {
                    handleAnswer();
                  }
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                Submit Answer
              </button>
              <button
                onClick={() => {
                  // If skipping, record a "No Answer" for this question
                  if (selectedOption === null) {
                    const skippedDetail = {
                      questionText: currentQuestion.questionText,
                      questionType: currentQuestion.questionType,
                      selectedAnswer: "No Answer",
                      correctAnswer:
                        currentQuestion.questionType === "multiple"
                          ? currentQuestion.options[
                              currentQuestion.correctOption
                            ]
                          : currentQuestion.answer,
                      isCorrect: false,
                    };
                    const newDetails = [...answersDetails, skippedDetail];
                    setAnswersDetails(newDetails);
                    toast.error("Question skipped.");
                    handleNextQuestion(score, newDetails);
                  } else {
                    handleNextQuestion(score);
                  }
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300 cursor-pointer"
              >
                Skip Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptQuiz;
