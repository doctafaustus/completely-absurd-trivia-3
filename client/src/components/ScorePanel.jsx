import React from 'react';
import './ScorePanel.scss';

const ScorePanel = ({ rank, score, accuracy }) => {
  return (
    <div className="score-panel">
      <div className="score-card rank-card">
        <div className="pulse-dot rank-dot"></div>
        <div className="card-content">
          <div className="card-value rank-value">{rank}</div>
          <div className="card-label">Rank</div>
        </div>
      </div>

      <div className="score-card score-card-main">
        <div className="pulse-dot score-dot"></div>
        <div className="card-content">
          <div className="card-value score-value">{score}</div>
          <div className="card-label">Score</div>
        </div>
      </div>

      <div className="score-card accuracy-card">
        <div className="pulse-dot"></div>
        <div className="card-content">
          <div className="card-value">{accuracy}%</div>
          <div className="card-label">Accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default ScorePanel;
