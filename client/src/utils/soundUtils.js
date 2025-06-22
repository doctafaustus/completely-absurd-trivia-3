// Audio instances
let scoreSound = null;
let tallySound = null;

// Initialize sounds
export const initSounds = () => {
  if (!scoreSound) {
    // For the initial "correct" sound (you might want to add a separate MP3 for this)
    scoreSound = new Audio('/correct_answer.mp3');
    scoreSound.volume = 0.5;
  }

  if (!tallySound) {
    // For the 1.7 second counting animation
    tallySound = new Audio('/point_tally.mp3');
    tallySound.volume = 0.7;
  }
};

// Play a sound when answer is correct
export const playScoreSound = () => {
  initSounds();

  // You can use either your correct_answer.mp3 if you have one,
  // or just play the tally sound if you only have one sound file
  if (scoreSound && scoreSound.readyState >= 2) {
    scoreSound.currentTime = 0;
    scoreSound.play().catch((e) => console.log('Error playing sound:', e));
  }
};

// Play score counting animation sound
export const playScoreCountingSound = () => {
  initSounds();

  if (tallySound && tallySound.readyState >= 2) {
    tallySound.currentTime = 0;
    tallySound.play().catch((e) => console.log('Error playing sound:', e));
  }
};

// Preload sounds when the page loads
export const preloadSounds = () => {
  initSounds();
};
