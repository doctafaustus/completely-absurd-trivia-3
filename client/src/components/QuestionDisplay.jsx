import React from 'react';
import ParticleCanvas from './ParticleCanvas';
import { useGameContext } from '../context/GameContext';

const QuestionDisplay = () => {
  const { questions, currentQuestionIndex, displayedText } = useGameContext();

  return (
    <div className="question-section">
      <ParticleCanvas particleCount={160} speed={0.13} key="particles" />
      <div className="cat-mascot">🐱</div>
      <div className="question-text">
        <span className="question-visible">{displayedText}</span>
        <span className="question-hidden">
          {questions[currentQuestionIndex].text.slice(displayedText.length)}
        </span>
      </div>
    </div>
  );
};

export default QuestionDisplay;
