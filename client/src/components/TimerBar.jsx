import '../styles/_timer-bar.scss';

import { useEffect, useState } from 'react';

const TimerBar = ({
  duration = 15, // Duration in seconds
  onTimeUp = () => {}, // Callback when timer ends
  isRunning = true, // Control whether timer is running
  colorScheme = 'purple', // 'purple', 'blue', 'red', etc.
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [percentage, setPercentage] = useState(100);

  // Timer logic
  useEffect(() => {
    let interval = null;

    if (isRunning && timeRemaining > 0) {
      // For smoother animation, decrease interval frequency and adjustment size
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 0.05; // Smaller increment
          if (newTime <= 0) {
            clearInterval(interval);
            onTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 50); // Update more frequently with smaller changes
    } else if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, onTimeUp]);

  // Update percentage based on time remaining
  useEffect(() => {
    setPercentage((timeRemaining / duration) * 100);
  }, [timeRemaining, duration]);

  // Get proper CSS classes based on color scheme
  const colorClass = `timer-${colorScheme || 'purple'}`;

  return (
    <div className="timer-container">
      {/* Base track */}
      <div className="timer-track"></div>

      {/* Timer fill */}
      <div
        className={`timer-fill ${colorClass}`}
        style={{ width: `${percentage}%` }}
      ></div>

      {/* Energy trail */}
      <div
        className={`energy-trail ${colorClass}`}
        style={{ right: `calc(${percentage}% - 80px)` }} // Changed from left to right
      ></div>

      {/* Orb marker */}
      <div
        className="end-marker"
        style={{ right: `${percentage}%` }} // Changed from left to right
      >
        <div className={`orb ${colorClass}`}></div>
      </div>

      {/* Timer highlight */}
      <div
        className="timer-highlight"
        style={{ width: `${percentage}%` }}
      ></div>

      {/* Wave animation */}
      <div className={`wave ${colorClass}`}></div>

      {/* Countdown text */}
      <div className="countdown">{Math.ceil(timeRemaining)}s</div>
    </div>
  );
};

export default TimerBar;
