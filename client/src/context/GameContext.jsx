import React, { createContext, useState, useEffect, useContext } from 'react';
import { statusMessages } from '../config/statusMessages';
import { questions } from '../config/questionData';
import { players } from '../config/playerData';
import { triggerConfetti } from '../utils/confettiEffect';
import {
  playScoreSound,
  playScoreCountingSound,
  preloadSounds,
} from '../utils/soundUtils';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Status state
  const [statusType, setStatusType] = useState('waiting');
  const [statusMessage, setStatusMessage] = useState(statusMessages.waiting);

  // Game state
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // Answer feedback state
  const [correctAnswer, setCorrectAnswer] = useState(3); // Index of correct answer (default to Mercury in first question)
  const [showAnswerResult, setShowAnswerResult] = useState(false);
  const [playerOneAnswerState, setPlayerOneAnswerState] = useState(null); // null, 'correct' or 'incorrect'

  // Animation state
  const [isP1Celebrating, setIsP1Celebrating] = useState(false);
  const [isP1Incorrect, setIsP1Incorrect] = useState(false);
  const [incorrectTimeout, setIncorrectTimeout] = useState(null);
  const [celebrationTimeout, setCelebrationTimeout] = useState(null);

  // Score animation state
  const [isAnimatingScore, setIsAnimatingScore] = useState(false);
  const [scoreAnimationFrom, setScoreAnimationFrom] = useState(0);
  const [scoreAnimationTo, setScoreAnimationTo] = useState(0);
  const [showPointsAddedAnimation, setShowPointsAddedAnimation] =
    useState(false);
  const [pointsAddedPosition, setPointsAddedPosition] = useState({
    x: 0,
    y: 0,
  });

  // Stats
  const [gameStats, setGameStats] = useState({
    rank: '7/43',
    score: 1345,
    accuracy: 50,
  });

  // Updated player data with animated score
  const [updatedPlayers, setUpdatedPlayers] = useState(players);

  const startTimer = () => {
    setTimerRunning(true);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerExpired(false);
  };

  // Function to set status
  const setStatus = (type) => {
    setStatusType(type);
    setStatusMessage(statusMessages[type] || '');
  };

  // Clear status
  const clearStatus = () => {
    setStatus('waiting');
  };

  // Function to update player score with animation
  const updatePlayerScore = (playerIndex, pointsToAdd) => {
    const player = updatedPlayers[playerIndex];
    const oldScore = player.score;
    const newScore = oldScore + pointsToAdd;

    // Set animation state for this player
    if (playerIndex === 0) {
      // Only animate player one for now
      setScoreAnimationFrom(oldScore);
      setScoreAnimationTo(newScore);
      setIsAnimatingScore(true);

      // Play the counting sound (point_tally.mp3)
      setTimeout(() => {
        // Play the counting sound (point_tally.mp3) after delay
        playScoreCountingSound();
      }, 500);

      // Update game stats score with animation
      setGameStats((prev) => ({
        ...prev,
        score: prev.score + pointsToAdd,
      }));

      // Show the floating points added animation
      setShowPointsAddedAnimation(true);

      // After animation completes
      setTimeout(() => {
        setIsAnimatingScore(false);
        setShowPointsAddedAnimation(false);
      }, 1700); // Match our animation duration (should match your MP3 length)
    }

    // Update the player's actual score
    setUpdatedPlayers((prev) => {
      const newPlayers = [...prev];
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        score: newScore,
      };
      return newPlayers;
    });
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
    setStatus('correct');

    // Play initial correct sound
    playScoreSound();

    // Add points (150) with animation
    updatePlayerScore(0, 150);

    // Set new timeout and store its reference
    const newTimeout = setTimeout(() => {
      setIsP1Celebrating(false);
      setCelebrationTimeout(null);
      // Don't reset to waiting state - keep showing the correct answer
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
      // Don't reset to waiting state - keep showing the correct answer
    }, 3000);

    setIncorrectTimeout(newTimeout);
  };

  const evaluateAnswer = () => {
    if (selectedAnswer === null) {
      // No answer selected yet
      setStatus('waiting');
      return;
    }

    setShowAnswerResult(true);

    // Determine if player one got it right or wrong
    const isCorrect = selectedAnswer === correctAnswer;

    // Set player one's answer state
    setPlayerOneAnswerState(isCorrect ? 'correct' : 'incorrect');

    // Trigger appropriate animation
    if (isCorrect) {
      triggerCorrectAnimation();
    } else {
      triggerIncorrectAnimation();
    }
  };

  const resetAnswers = () => {
    console.log('Reset answers function called');

    // Reset player answer state
    setPlayerOneAnswerState(null);

    // Reset selection state
    setSelectedAnswer(null);
    setHasAnswered(false);

    // Hide answer results
    setShowAnswerResult(false);

    // Reset animations and celebrations
    setIsP1Celebrating(false);
    setIsP1Incorrect(false);

    // Clear any existing timeouts
    if (celebrationTimeout) {
      clearTimeout(celebrationTimeout);
      setCelebrationTimeout(null);
    }
    if (incorrectTimeout) {
      clearTimeout(incorrectTimeout);
      setIncorrectTimeout(null);
    }

    // Reset status to waiting
    setStatus('waiting');
  };

  // Set the position for the floating points animation
  const setPointsAddedAnimationPosition = (x, y) => {
    setPointsAddedPosition({ x, y });
  };

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
    if (!statusType) {
      setStatusType('waiting');
      setStatusMessage(statusMessages.waiting);
    }
  }, []);

  useEffect(() => {
    if (timerExpired) {
      // Logic for handling incorrect answer
      // For example:
      // markCurrentAnswerAsIncorrect();
      // or:
      // setCurrentStatus('incorrect');

      // Reset timer state
      setTimerRunning(false);
    }
  }, [timerExpired]);

  // Initialize updatedPlayers from players on first render
  useEffect(() => {
    setUpdatedPlayers(players);

    // Preload sound effects when the component mounts
    preloadSounds();
  }, []);

  // Game control functions
  const selectQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowAnswerResult(false);
    setPlayerOneAnswerState(null);
    setStatus('waiting');

    // Update correct answer based on question
    // In a real app, this would come from your question data
    if (questionIndex === 0) setCorrectAnswer(3); // Mercury
    else if (questionIndex === 1) setCorrectAnswer(1); // Whale
    else setCorrectAnswer(0); // Nothing special
  };

  const handleAnswerSelect = (index) => {
    if (showAnswerResult) return; // Prevent selecting after result is shown

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

  // Value to be provided to consumers
  const value = {
    // State
    statusType,
    statusMessage,
    selectedAnswer,
    hasAnswered,
    currentQuestionIndex,
    displayedText,
    isTyping,
    isP1Celebrating,
    isP1Incorrect,
    gameStats,
    players: updatedPlayers, // Using our updated players with animated scores
    questions,
    correctAnswer,
    showAnswerResult,
    playerOneAnswerState,
    timerRunning,
    timerExpired,
    setTimerExpired,

    // Score animation state
    isAnimatingScore,
    scoreAnimationFrom,
    scoreAnimationTo,
    showPointsAddedAnimation,
    pointsAddedPosition,

    // Functions
    setStatus,
    clearStatus,
    triggerCorrectAnimation,
    triggerIncorrectAnimation,
    selectQuestion,
    handleAnswerSelect,
    evaluateAnswer,
    resetAnswers,
    startTimer,
    resetTimer,
    updatePlayerScore,
    setPointsAddedAnimationPosition,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
