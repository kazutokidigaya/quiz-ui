import { useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaChartBar, FaHistory } from "react-icons/fa";
import { CgTimer } from "react-icons/cg";

const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      name: "Create a Quiz",
      description:
        "Design interactive quizzes with both multiple-choice and integer questions.",
      icon: FaQuestionCircle,
    },
    {
      name: "Attempt Quizzes",
      description:
        "Test your knowledge with timed quizzes that provide instant feedback.",
      icon: CgTimer,
    },
    {
      name: "View Results",
      description:
        "See your detailed performance breakdown and track your progress.",
      icon: FaChartBar,
    },
    {
      name: "Review History",
      description: "Access all your previous quiz attempts stored locally.",
      icon: FaHistory,
    },
  ];

  return (
    <main>
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Welcome to QuizEZ
            </h2>
            <p className="mt-2 text-3xl sm:text-6xl font-bold tracking-tight text-gray-900">
              Your Ultimate Quiz Companion
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Challenge yourself with interactive quizzes. Create, attempt, and
              review your progress with a modern, responsive interface.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 text-white mt-4 py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Get Started
          </button>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              alt="Quiz Illustration"
              src="https://res.cloudinary.com/dqela8lj8/image/upload/v1732818027/pi9ezepogjyesmexbcoq.webp"
              className="mb-0 rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-white/95 pt-5" />
            </div>
          </div>
        </div>
        {/* Steps Section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            {steps.map((step) => (
              <div key={step.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900 flex items-center">
                  <step.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-6 w-6 text-indigo-600"
                  />
                  <span className="ml-8">{step.name}</span>
                </dt>
                <dd className="mt-2 ml-8">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
};

export default Home;
