import '../styles/_question-panel.scss';

import ParticleCanvas from './ParticleCanvas';
import { useGameContext } from '../context/GameContext';
import TimerBar from './TimerBar';

const QuestionPanel = () => {
  const {
    questions,
    currentQuestionIndex,
    displayedText,
    timerRunning,
    setTimerExpired,
    questionDuration = 15, // This would come from your GameContext if available
  } = useGameContext();

  const handleTimeUp = () => {
    // Call your game context method to handle time expiration
    if (setTimerExpired) {
      setTimerExpired(true);
    }
  };

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

      {/* Integrated timer */}
      <TimerBar
        duration={questionDuration}
        onTimeUp={handleTimeUp}
        isRunning={timerRunning}
        colorScheme="purple"
      />
    </div>
  );
};

export default QuestionPanel;
