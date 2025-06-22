import '../styles/_players-section.scss';

import { useGameContext } from '../context/GameContext';

const PlayersSection = () => {
  const {
    players,
    hasAnswered,
    isP1Celebrating,
    isP1Incorrect,
    playerOneAnswerState,
  } = useGameContext();

  return (
    <div className="players-section">
      {players.map((player, index) => {
        // Only apply the answer state class to the first player (index 0)
        const stateClass =
          index === 0 && playerOneAnswerState
            ? `player-${playerOneAnswerState}`
            : '';

        return (
          <div
            key={player.name}
            className={`player-card ${
              index === 0 && hasAnswered ? 'answered' : ''
            } ${stateClass}`}
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
        );
      })}
    </div>
  );
};

export default PlayersSection;
