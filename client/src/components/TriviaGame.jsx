import '../styles/_trivia-game.scss';

import ScorePanel from './ScorePanel';
import AdminPanel from './AdminPanel';
import PlayersSection from './PlayersSection';
import QuestionPanel from './QuestionPanel';
import PlayerGrid from './PlayerGrid';
import AnswerOptions from './AnswerOptions';
import { GameProvider, useGameContext } from '../context/GameContext';

const TriviaGameContent = () => {
  const { statusType, statusMessage, gameStats } = useGameContext();

  return (
    <div className="trivia-game">
      <div className="game-container">
        <div className="game-header">
          <div className="game-logo">🎪</div>
          <h1 className="game-title">COMPLETELY ABSURD TRIVIA</h1>
        </div>

        <AdminPanel />

        <ScorePanel
          rank={gameStats.rank}
          score={gameStats.score.toLocaleString()}
          accuracy={gameStats.accuracy}
        />

        <PlayersSection />

        <div className="main-content">
          <QuestionPanel />
          <PlayerGrid />
        </div>

        <AnswerOptions />
      </div>
    </div>
  );
};

// Wrapper component to provide context
const TriviaGame = () => {
  return (
    <GameProvider>
      <TriviaGameContent />
    </GameProvider>
  );
};

export default TriviaGame;
