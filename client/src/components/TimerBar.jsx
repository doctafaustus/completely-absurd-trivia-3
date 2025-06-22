import '../styles/_timer-bar.scss';
import { useEffect, useState } from 'react';

const TimerBar = ({
  duration = 8, // Duration in seconds
  onTimeUp = () => {}, // Callback when timer ends
  isRunning = false, // Control whether timer is running
  colorScheme = 'purple', // 'purple', 'blue', 'red', etc.
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [percentage, setPercentage] = useState(100);

  // Reset time when timer starts
  useEffect(() => {
    if (isRunning) {
      console.log('🧼 Resetting timeRemaining to', duration);
      setTimeRemaining(duration);
    }
  }, [isRunning, duration]);

  // Countdown interval
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 0.05;
          if (newTime <= 0) {
            clearInterval(interval);
            setTimeout(() => {
              console.log('💥 Timer done!');
              onTimeUp(); // defer to avoid render-phase state updates
            }, 0);
            return 0;
          }
          return newTime;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  // Update percentage for the visual bar
  useEffect(() => {
    setPercentage((timeRemaining / duration) * 100);
  }, [timeRemaining, duration]);

  const colorClass = `timer-${colorScheme || 'purple'}`;

  return (
    <div className="timer-container">
      <div className="timer-track"></div>

      <div
        className={`timer-fill ${colorClass}`}
        style={{ width: `${percentage}%` }}
      ></div>

      <div
        className={`energy-trail ${colorClass}`}
        style={{ right: `calc(${percentage}% - 80px)` }}
      ></div>

      <div className="end-marker" style={{ right: `${percentage}%` }}>
        <div className={`orb ${colorClass}`}></div>
      </div>

      <div
        className="timer-highlight"
        style={{ width: `${percentage}%` }}
      ></div>

      <div className={`wave ${colorClass}`}></div>

      <div className="countdown">{Math.ceil(timeRemaining)}s</div>
    </div>
  );
};

export default TimerBar;
