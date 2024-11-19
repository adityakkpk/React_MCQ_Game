import { useState } from "react";
import { questions } from "./questions";
import { motion, AnimatePresence } from "framer-motion";

const MCQGame = () => {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currQuestion < questions.length - 1) {
      setCurrQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const currentQuestionData = questions[currQuestion];

  // Logic to maintain Highest Score using LocalStorage
  const [highestScore, setHighestScore] = useState(parseInt(localStorage.getItem('highestScore')) || 0);
  

  if (showResult) {
    if (highestScore < score) {
      setHighestScore(score);
      localStorage.setItem('highestScore', highestScore);
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">
            Your Score: {score} out of {questions.length}
          </p>
          <p className="text-xl mb-6">
            Heighest Score: {highestScore}
          </p>
          <button
            onClick={restartGame}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currQuestion}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Question {currQuestion + 1}
          </h2>
          <p className="text-xl mb-6 text-center">
            {currentQuestionData.question}
          </p>

          <div className="space-y-4">
            {currentQuestionData.options.map((option, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-3 text-left rounded-md transition ${
                  selectedAnswer === option
                    ? "bg-blue-100 border-2 border-blue-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-6 w-full p-3 rounded-md text-white transition ${
              selectedAnswer
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currQuestion === questions.length - 1 ? "Finish" : "Next Question"}
          </motion.button>

          <div className="mt-4 text-center text-sm text-gray-500">
            1/5 Questions
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MCQGame;
