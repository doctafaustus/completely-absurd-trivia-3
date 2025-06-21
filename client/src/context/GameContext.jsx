import React, { createContext, useState, useEffect, useContext } from 'react';
import { statusMessages } from '../config/statusMessages';
import { questions } from '../config/questionData';
import { players } from '../config/playerData';
import { triggerConfetti } from '../utils/confettiEffect';

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

  // Animation state
  const [isP1Celebrating, setIsP1Celebrating] = useState(false);
  const [isP1Incorrect, setIsP1Incorrect] = useState(false);
  const [incorrectTimeout, setIncorrectTimeout] = useState(null);
  const [celebrationTimeout, setCelebrationTimeout] = useState(null);

  // Stats
  const [gameStats, setGameStats] = useState({
    rank: '7/43',
    score: 1345,
    accuracy: 50,
  });

  // Function to set status
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
    setStatus('correct');

    // Set new timeout and store its reference
    const newTimeout = setTimeout(() => {
      setIsP1Celebrating(false);
      setCelebrationTimeout(null);
      setStatus('waiting');
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

  // Game control functions
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
    players,
    questions,

    // Functions
    setStatus,
    clearStatus,
    triggerCorrectAnimation,
    triggerIncorrectAnimation,
    selectQuestion,
    handleAnswerSelect,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
