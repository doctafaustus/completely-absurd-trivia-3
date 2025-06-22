import '../styles/_admin-panel.scss';

import { useGameContext } from '../context/GameContext';

const AdminPanel = () => {
  const {
    statusType,
    currentQuestionIndex,
    selectQuestion,
    setStatus,
    evaluateAnswer,
    resetAnswers,
    startTimer,
    resetTimer,
  } = useGameContext();

  const handleQuestionSelect = (questionIndex) => {
    console.log('⏱ Resetting timer...');
    resetTimer();
    selectQuestion(questionIndex);

    setTimeout(() => {
      console.log('▶️ Starting timer...');
      startTimer();
    }, 500);
  };

  return (
    <div className="admin-panel">
      <div className="admin-title">🔧 Admin Panel</div>

      <div className="admin-panel-content">
        {/* First row - Question controls */}
        <div className="question-controls">
          <button
            className={`admin-btn ${
              currentQuestionIndex === 0 ? 'active' : ''
            }`}
            onClick={() => handleQuestionSelect(0)}
          >
            Q1
          </button>
          <button
            className={`admin-btn ${
              currentQuestionIndex === 1 ? 'active' : ''
            }`}
            onClick={() => handleQuestionSelect(1)}
          >
            Q2
          </button>
          <button
            className={`admin-btn ${
              currentQuestionIndex === 2 ? 'active' : ''
            }`}
            onClick={() => handleQuestionSelect(2)}
          >
            Q3
          </button>
          <button
            className="admin-btn evaluate-btn"
            onClick={() => {
              evaluateAnswer();
              resetTimer(); // Stop the timer when evaluating
            }}
          >
            🔍 Evaluate Answer
          </button>
          <button
            className="admin-btn reset-btn"
            onClick={() => {
              resetAnswers();
              resetTimer(); // Reset timer when answers are reset
            }}
          >
            🔄 Reset Answers
          </button>
        </div>

        {/* Status controls */}
        <div className="status-controls-section">
          <div className="status-controls-label">Status Bar Controls:</div>
          <div className="status-controls">
            <button
              className={`admin-btn ${
                statusType === 'incorrect' ? 'active' : ''
              }`}
              onClick={() => setStatus('incorrect')}
            >
              Incorrect
            </button>
            <button
              className={`admin-btn ${
                statusType === 'correct' ? 'active' : ''
              }`}
              onClick={() => setStatus('correct')}
            >
              Correct
            </button>
            <button
              className={`admin-btn ${
                statusType === 'waiting' ? 'active' : ''
              }`}
              onClick={() => setStatus('waiting')}
            >
              Waiting
            </button>
            <button
              className={`admin-btn ${statusType === 'streak' ? 'active' : ''}`}
              onClick={() => setStatus('streak')}
            >
              Streak
            </button>
            <button
              className={`admin-btn ${
                statusType === 'timeWarning' ? 'active' : ''
              }`}
              onClick={() => setStatus('timeWarning')}
            >
              Time Warning
            </button>
            <button
              className={`admin-btn ${statusType === 'bonus' ? 'active' : ''}`}
              onClick={() => setStatus('bonus')}
            >
              Bonus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
