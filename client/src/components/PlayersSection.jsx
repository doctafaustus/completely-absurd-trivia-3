import React, { useRef, useEffect } from 'react';
import '../styles/_players-section.scss';
import { useGameContext } from '../context/GameContext';
import ScoreAnimation from './ScoreAnimation';

// Create a separate component for the floating points to isolate its effects
const FloatingPoints = ({ x, y }) => {
  return (
    <div
      className="points-added"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
        width: 'auto',
        height: 'auto',
        isolation: 'isolate',
        contain: 'layout',
      }}
    >
      +150
    </div>
  );
};

const PlayersSection = () => {
  const {
    players,
    hasAnswered,
    isP1Celebrating,
    isP1Incorrect,
    playerOneAnswerState,
    isAnimatingScore,
    scoreAnimationFrom,
    scoreAnimationTo,
    showPointsAddedAnimation,
    setPointsAddedAnimationPosition,
  } = useGameContext();

  const playerScoreRef = useRef(null);

  // Set the position for the floating +150 animation
  useEffect(() => {
    if (playerScoreRef.current && playerOneAnswerState === 'correct') {
      const rect = playerScoreRef.current.getBoundingClientRect();
      setPointsAddedAnimationPosition(rect.x + rect.width / 2, rect.y);
    }
  }, [playerOneAnswerState, setPointsAddedAnimationPosition]);

  return (
    <div className="players-section">
      {/* Move floating points to a portal or isolated container */}
      {showPointsAddedAnimation && playerScoreRef.current && (
        <FloatingPoints
          x={playerScoreRef.current.getBoundingClientRect().x}
          y={playerScoreRef.current.getBoundingClientRect().y}
        />
      )}

      {players.map((player, index) => {
        // Only apply the answer state class to the first player (index 0)
        const stateClass =
          index === 0 && playerOneAnswerState
            ? `player-${playerOneAnswerState}`
            : '';

        const headerStyle =
          index === 2
            ? {
                backgroundImage:
                  "url('https://i.ibb.co/S4QLc1NM/player-banner-example.jpg')",
                backgroundSize: 'auto',
                backgroundPosition: 'center right',
                backgroundRepeat: 'no-repeat',
              }
            : {};

        return (
          <div
            key={player.name}
            className={`player-card ${
              index === 0 && hasAnswered ? 'answered' : ''
            } ${stateClass}`}
          >
            <div className="player-header" style={headerStyle}>
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
            <div
              className="player-score"
              ref={index === 0 ? playerScoreRef : null}
            >
              {index === 0 && isAnimatingScore ? (
                <ScoreAnimation
                  startValue={scoreAnimationFrom}
                  endValue={scoreAnimationTo}
                  duration={1450}
                  showUnit={true}
                  unitText=" pts"
                />
              ) : (
                `${player.score.toLocaleString()} pts`
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayersSection;
