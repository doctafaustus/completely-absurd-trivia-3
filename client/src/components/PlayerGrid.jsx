import { useState } from 'react';
import '../styles/_player-grid.scss';

import { gridDots } from '../config/gridConfig';

// Sample random usernames to display in tooltips
const randomUsernames = [
  'CosmoQuizzer',
  'TriviaKing42',
  'BrainiacBetty',
  'QuizWizard',
  'FactMaster',
  'TriviaGuru',
  'QuestionMaster',
  'KnowledgeSeeker',
  'TriviaTitan',
  'WisdomHunter',
];

const PlayerGrid = () => {
  const [tooltipData, setTooltipData] = useState(null);

  const handleMouseEnter = (index) => {
    // Generate random username and points
    const username =
      randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
    const points = Math.floor(Math.random() * 2000) + 100; // Random points between 100-2100

    setTooltipData({
      index,
      username,
      points,
    });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <div className="grid-section">
      <div className="grid-header">
        <div className="grid-title">
          <span>🎪</span>
          Live Players
        </div>
        <div className="grid-counter">47/120 answered</div>
      </div>

      <div className="player-grid">
        {gridDots.map((status, index) => (
          <div
            key={index}
            className={`grid-dot ${status}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {tooltipData && tooltipData.index === index && (
              <div className="player-tooltip">
                <div className="tooltip-username">{tooltipData.username}</div>
                <div className="tooltip-points">{tooltipData.points} pts</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerGrid;
