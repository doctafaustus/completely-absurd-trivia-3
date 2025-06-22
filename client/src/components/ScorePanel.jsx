import React from 'react';
import '../styles/_score-panel.scss';
import { useGameContext } from '../context/GameContext';
import ScoreAnimation from './ScoreAnimation';

const ScorePanel = () => {
  const { gameStats, isAnimatingScore, scoreAnimationFrom, scoreAnimationTo } =
    useGameContext();

  const { rank, score, accuracy } = gameStats;

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
          <div className="card-value score-value">
            {isAnimatingScore ? (
              <ScoreAnimation
                startValue={scoreAnimationFrom}
                endValue={scoreAnimationTo}
                duration={1450}
                showUnit={false}
              />
            ) : (
              score
            )}
          </div>
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
