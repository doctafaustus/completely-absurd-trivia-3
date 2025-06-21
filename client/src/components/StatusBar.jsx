import React, { useState, useEffect, useRef } from 'react';
import './StatusBar.scss';

const StatusBar = ({ type, message }) => {
  // Always start with visible waiting state regardless of props
  const [animationState, setAnimationState] = useState('visible');
  const [displayType, setDisplayType] = useState('waiting');
  const [displayMessage, setDisplayMessage] = useState(
    'Waiting for other players to answer'
  );

  // Use a ref to track previous type for comparison
  const prevTypeRef = useRef(null);
  const prevMessageRef = useRef(null);
  // Add a ref to track the animation timer
  const animationTimerRef = useRef(null);

  // Handle animation states when type or message changes
  useEffect(() => {
    // Determine the actual type and message to use (with defaults)
    const currentType = type || 'waiting';
    const currentMessage = message || 'Waiting for other players to answer';

    // Compare with previous values
    const typeChanged =
      prevTypeRef.current !== null && currentType !== prevTypeRef.current;
    const messageChanged =
      prevMessageRef.current !== null &&
      currentMessage !== prevMessageRef.current;

    // Cancel any existing animation timer when status changes
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }

    // Update content first
    setDisplayType(currentType);
    setDisplayMessage(currentMessage);

    // If type or message actually changed (not just initial render)
    if (typeChanged || messageChanged) {
      console.log(
        'Status changed! Animating from',
        prevTypeRef.current,
        'to',
        currentType
      );

      // Reset animation state before starting new animation
      // This forces a re-render and ensures animation restarts
      setAnimationState('visible');

      // Use requestAnimationFrame to ensure the state change has been applied
      // before starting the new animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Now set the pulse animation state
          setAnimationState('pulse');

          // Reset to visible after animation completes
          animationTimerRef.current = setTimeout(() => {
            setAnimationState('visible');
            animationTimerRef.current = null;
          }, 800);
        });
      });
    }

    // Update refs for next comparison
    prevTypeRef.current = currentType;
    prevMessageRef.current = currentMessage;

    // Cleanup function
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    };
  }, [type, message]);

  // Map of status types to their respective classes and icons
  const statusConfig = {
    incorrect: {
      className: 'incorrect',
      icon: <span className="pulse-dot"></span>,
    },
    correct: {
      className: 'correct',
      icon: <span className="pulse-dot-green"></span>,
    },
    waiting: {
      className: 'waiting',
      icon: (
        <div className="dots-loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ),
    },
    streak: {
      className: 'streak',
      icon: <span className="fire">🔥</span>,
    },
    timeWarning: {
      className: 'time-warning',
      icon: <span className="pulse-dot-yellow"></span>,
    },
    bonus: {
      className: 'bonus',
      icon: <span className="plus">+</span>,
    },
  };

  // Get the configuration for the current display type, defaulting to waiting
  const { className, icon } = statusConfig[displayType] || statusConfig.waiting;

  // Always render a status bar
  return (
    <div className={`status-bar ${className} ${animationState}`}>
      {icon}
      {displayMessage}
    </div>
  );
};

export default StatusBar;
