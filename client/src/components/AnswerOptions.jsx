import React from 'react';
import { useGameContext } from '../context/GameContext';

const AnswerOptions = () => {
  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    handleAnswerSelect,
  } = useGameContext();

  return (
    <div className="answers-section">
      {questions[currentQuestionIndex].answers.map((answer, index) => (
        <div
          key={index}
          className={`answer-option ${
            selectedAnswer === index ? 'selected' : ''
          }`}
          onClick={() => handleAnswerSelect(index)}
        >
          <div className="answer-letter">{answer.letter}</div>
          <div className="answer-text">{answer.text}</div>
        </div>
      ))}
    </div>
  );
};

export default AnswerOptions;
