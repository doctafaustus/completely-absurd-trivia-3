import React from 'react';
import './StatusBar.scss'; // You'll need to create this file with the styles

const StatusBar = ({ type, message }) => {
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

  const { className, icon } = statusConfig[type] || statusConfig.waiting;

  return (
    <div className={`status-bar ${className}`}>
      {icon}
      {message}
    </div>
  );
};

export default StatusBar;
