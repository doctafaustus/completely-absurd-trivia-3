import React, { useEffect, useState, useRef } from 'react';
import '../styles/_score-animation.scss';

const ScoreAnimation = ({
  startValue,
  endValue,
  duration = 1700,
  onAnimationComplete,
  showUnit = false,
  unitText = '',
}) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Reset to starting value when props change
    setCurrentValue(startValue);

    // Animation function
    const animateValue = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Calculate progress (0 to 1)
      const progress = Math.min(elapsed / duration, 1);

      // Calculate current value - using easeOutQuad for a nice effect
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const newValue = Math.round(
        startValue + (endValue - startValue) * easedProgress
      );

      // Update state
      setCurrentValue(newValue);

      // Continue animation if not complete
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateValue);
      } else {
        // Animation complete
        if (onAnimationComplete) onAnimationComplete();
      }
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateValue);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startValue, endValue, duration, onAnimationComplete]);

  return (
    <span className="animated-score">
      {currentValue.toLocaleString()}
      {showUnit && unitText}
    </span>
  );
};

export default ScoreAnimation;
