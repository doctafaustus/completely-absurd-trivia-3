import './TriviaGame.scss';
import ScorePanel from './ScorePanel';
import StatusBar from './StatusBar';
import AdminPanel from './AdminPanel';
import PlayersSection from './PlayersSection';
import QuestionDisplay from './QuestionDisplay';
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

        <StatusBar type={statusType} message={statusMessage} />

        <div className="main-content">
          <QuestionDisplay />
          <PlayerGrid />
        </div>

        <AnswerOptions />

        <div className="feedback-text">💬 "Bold pick. Wrong... but bold."</div>
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
