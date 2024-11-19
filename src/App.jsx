import React, { useState } from 'react';
import { questions } from './questions';


const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question or finish game
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">
            Your Score: {score} out of {questions.length}
          </p>
          <button 
            onClick={restartGame}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Question {currentQuestion + 1}
        </h2>
        <p className="text-xl mb-6 text-center">
          {currentQuestionData.question}
        </p>
        
        <div className="space-y-4">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-3 text-left rounded-md transition 
                ${selectedAnswer === option 
                  ? 'bg-blue-100 border-2 border-blue-500' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <button 
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className={`mt-6 w-full p-3 rounded-md text-white transition
            ${selectedAnswer 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          {currentQuestion + 1} / {questions.length} Questions
        </div>
      </div>
    </div>
  );
};

export default App;