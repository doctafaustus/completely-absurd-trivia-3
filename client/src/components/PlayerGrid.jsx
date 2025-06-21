import React from 'react';
import { gridDots } from '../config/gridConfig';

const PlayerGrid = () => {
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
          <div key={index} className={`grid-dot ${status}`}></div>
        ))}
      </div>
    </div>
  );
};

export default PlayerGrid;
