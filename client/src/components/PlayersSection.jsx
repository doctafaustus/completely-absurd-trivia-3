import React from 'react';
import { useGameContext } from '../context/GameContext';

const PlayersSection = () => {
  const { players, hasAnswered, isP1Celebrating, isP1Incorrect } =
    useGameContext();

  return (
    <div className="players-section">
      {players.map((player, index) => (
        <div
          key={player.name}
          className={`player-card ${
            index === 0 && hasAnswered ? 'answered' : ''
          }`}
        >
          <div className="player-header">
            <div className="player-name">{player.name}</div>
            <div className="rank-badge">{player.rank}</div>
          </div>
          <div className="player-avatar">
            <img
              src={player.avatar}
              alt={`${player.name} avatar`}
              className={`avatar-image ${
                index === 0 && isP1Celebrating ? 'celebrating' : ''
              } ${index === 0 && isP1Incorrect ? 'incorrect' : ''}`}
            />
          </div>
          <div className="player-score">
            {player.score.toLocaleString()} pts
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayersSection;
