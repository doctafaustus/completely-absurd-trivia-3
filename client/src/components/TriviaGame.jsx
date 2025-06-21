import React, { useState, useEffect } from 'react';
import './TriviaGame.scss';
import ParticleCanvas from './ParticleCanvas';
import ScorePanel from './ScorePanel';
import { triggerConfetti } from '../utils/confettiEffect';
import StatusBar from './StatusBar';

const TriviaGame = () => {
  const statusMessages = {
    incorrect: "Incorrect – the correct answer was 'Mercury'",
    correct: 'Correct! You earned 150 points',
    waiting: 'Waiting for other players to answer',
    streak: '3 correct answers in a row! +50% bonus points',
    timeWarning: '5 seconds left to answer!',
    bonus: 'First to answer correctly! 200 bonus points added',
  };

  // Initialize with waiting status
  const [statusType, setStatusType] = useState('waiting');
  const [statusMessage, setStatusMessage] = useState(statusMessages.waiting);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isP1Celebrating, setIsP1Celebrating] = useState(false);
  const [isP1Incorrect, setIsP1Incorrect] = useState(false);
  const [incorrectTimeout, setIncorrectTimeout] = useState(null);
  const [celebrationTimeout, setCelebrationTimeout] = useState(null);
  const [gameStats, setGameStats] = useState({
    rank: '7/43',
    score: 1345,
    accuracy: 50,
  });

  // Function to set status (called from admin panel or game logic)
  const setStatus = (type) => {
    setStatusType(type);
    setStatusMessage(statusMessages[type] || '');
  };

  // Clear status
  const clearStatus = () => {
    setStatus('waiting');
  };

  const triggerCorrectAnimation = () => {
    // Clear any existing timeout first
    if (celebrationTimeout) {
      clearTimeout(celebrationTimeout);
    }
    if (incorrectTimeout) {
      clearTimeout(incorrectTimeout);
    }

    // Clear incorrect animation if it's running
    setIsP1Incorrect(false);

    // Start the animation
    setIsP1Celebrating(true);
    triggerConfetti();

    // Set new timeout and store its reference
    const newTimeout = setTimeout(() => {
      setIsP1Celebrating(false);
      setCelebrationTimeout(null);
    }, 2000);

    setCelebrationTimeout(newTimeout);
  };

  const triggerIncorrectAnimation = () => {
    // Clear any existing timeout first
    if (celebrationTimeout) {
      clearTimeout(celebrationTimeout);
    }
    if (incorrectTimeout) {
      clearTimeout(incorrectTimeout);
    }

    // Clear celebration animation if it's running
    setIsP1Celebrating(false);

    // Start the incorrect animation
    setIsP1Incorrect(true);
    setStatus('incorrect');

    // Set new timeout and store its reference
    const newTimeout = setTimeout(() => {
      setIsP1Incorrect(false);
      setIncorrectTimeout(null);
      // Transition to waiting after the animation
      setStatus('waiting');
    }, 3000);

    setIncorrectTimeout(newTimeout);
  };

  const players = [
    {
      name: 'BilboBaggins',
      avatar: '/character_default.png',
      score: 2000,
      rank: 1,
    },
    {
      name: 'Barracuda6904',
      avatar: '/character_default.png',
      score: 1300,
      rank: 2,
    },
    { name: 'VenasK4', avatar: '/character_default.png', score: 1299, rank: 3 },
    {
      name: 'JoeyPotato',
      avatar: '/character_default.png',
      score: 950,
      rank: 4,
    },
  ];

  const questions = [
    {
      text: 'What is the closest planet to the Sun?',
      answers: [
        { letter: 'A', text: 'Mars' },
        { letter: 'B', text: 'Venus' },
        { letter: 'C', text: 'Earth' },
        { letter: 'D', text: 'Mercury' },
      ],
    },
    {
      text: 'Which animal can hold its breath the longest underwater?',
      answers: [
        { letter: 'A', text: 'Dolphin' },
        { letter: 'B', text: 'Whale' },
        { letter: 'C', text: 'Turtle' },
        { letter: 'D', text: 'Penguin' },
      ],
    },
    {
      text: 'What happens if you eat a banana backwards?',
      answers: [
        { letter: 'A', text: 'Nothing special' },
        { letter: 'B', text: 'You gain superpowers' },
        { letter: 'C', text: 'You turn yellow' },
        { letter: 'D', text: 'The banana screams' },
      ],
    },
  ];

  const gridDots = Array(120)
    .fill(null)
    .map((_, index) => {
      if (index < 12) {
        // First row pattern
        if ([0, 2, 8, 11].includes(index)) return 'correct';
        if ([1, 10].includes(index)) return 'incorrect';
        if ([4, 5, 6, 7].includes(index)) return 'highlighted';
        return '';
      }
      if (index < 24) {
        // Second row pattern
        const rowIndex = index - 12;
        if ([0, 1, 3, 9, 10].includes(rowIndex)) return 'correct';
        if ([2, 8].includes(rowIndex)) return 'incorrect';
        return '';
      }
      if (index < 36) {
        // Third row pattern
        const rowIndex = index - 24;
        if ([1, 2].includes(rowIndex)) return 'correct';
        if ([0].includes(rowIndex)) return 'incorrect';
        return '';
      }
      return '';
    });

  // Typewriter effect for questions
  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex].text;
    setDisplayedText('');
    setIsTyping(true);

    let index = 0;
    const timer = setInterval(() => {
      if (index < currentQuestion.length) {
        setDisplayedText(currentQuestion.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 15); // Adjust speed here (lower = faster)

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
      if (celebrationTimeout) {
        clearTimeout(celebrationTimeout);
      }
      if (incorrectTimeout) {
        clearTimeout(incorrectTimeout);
      }
    };
  }, [celebrationTimeout, incorrectTimeout]);

  useEffect(() => {
    // This ensures the status bar is visible on first render
    // You can remove this if you've fixed the initialization in StatusBar.jsx
    if (!statusType) {
      setStatusType('waiting');
      setStatusMessage(statusMessages.waiting);
    }
  }, []);

  // Admin Panel
  const selectQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const handleAnswerSelect = (index) => {
    if (selectedAnswer === index) {
      // If clicking the already selected answer, deselect it
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      // If clicking a new answer, select it
      setSelectedAnswer(index);
      setHasAnswered(true);
    }
  };

  return (
    <div className="trivia-game">
      <div className="game-container">
        <div className="game-header">
          <div className="game-logo">🎪</div>
          <h1 className="game-title">COMPLETELY ABSURD TRIVIA</h1>
        </div>

        <div className="admin-panel">
          <div className="admin-title">🔧 Admin Panel</div>

          <div className="admin-panel-content">
            {/* First row - Question controls */}
            <div className="question-controls">
              <button
                className={`admin-btn ${
                  currentQuestionIndex === 0 ? 'active' : ''
                }`}
                onClick={() => selectQuestion(0)}
              >
                Q1
              </button>
              <button
                className={`admin-btn ${
                  currentQuestionIndex === 1 ? 'active' : ''
                }`}
                onClick={() => selectQuestion(1)}
              >
                Q2
              </button>
              <button
                className={`admin-btn ${
                  currentQuestionIndex === 2 ? 'active' : ''
                }`}
                onClick={() => selectQuestion(2)}
              >
                Q3
              </button>
              <button
                className="admin-btn correct-btn"
                onClick={triggerCorrectAnimation}
              >
                ✨ Correct!
              </button>
              <button
                className="admin-btn wrong-btn"
                onClick={triggerIncorrectAnimation}
              >
                ❌ Wrong!
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
                  className={`admin-btn ${
                    statusType === 'streak' ? 'active' : ''
                  }`}
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
                  className={`admin-btn ${
                    statusType === 'bonus' ? 'active' : ''
                  }`}
                  onClick={() => setStatus('bonus')}
                >
                  Bonus
                </button>
                <button className="admin-btn" onClick={clearStatus}>
                  Hide Status
                </button>
              </div>
            </div>
          </div>
        </div>

        <ScorePanel
          rank={gameStats.rank}
          score={gameStats.score.toLocaleString()} // Formats numbers with commas
          accuracy={gameStats.accuracy}
        />

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

        <StatusBar type={statusType} message={statusMessage} />

        <div className="main-content">
          <div className="question-section">
            <ParticleCanvas particleCount={160} speed={0.13} key="particles" />
            <div className="cat-mascot">🐱</div>
            <div className="question-text">
              <span className="question-visible">{displayedText}</span>
              <span className="question-hidden">
                {questions[currentQuestionIndex].text.slice(
                  displayedText.length
                )}
              </span>
            </div>
          </div>

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
        </div>

        <div className="answers-section">
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <div
              key={index}
              className={`answer-option ${
                selectedAnswer === index ? 'selected' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <div className="answer-letter">{answer.letter}</div>
              <div className="answer-text">{answer.text}</div>
            </div>
          ))}
        </div>

        <div className="feedback-text">💬 "Bold pick. Wrong... but bold."</div>
      </div>
    </div>
  );
};

export default TriviaGame;
