const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Trivia server is running!' });
});

// Trivia game endpoints
app.get('/api/questions', (req, res) => {
  res.json({
    question: 'What is the closest planet to the Sun?',
    answers: [
      { letter: 'A', text: 'Mars' },
      { letter: 'B', text: 'Venus' },
      { letter: 'C', text: 'Earth' },
      { letter: 'D', text: 'Mercury' },
    ],
    correctAnswer: 'D',
  });
});

app.get('/api/players', (req, res) => {
  res.json([
    { name: 'BilboBaggins', avatar: '👻', score: 2000, rank: 1 },
    { name: 'Barracuda6904', avatar: '🦄', score: 1300, rank: 2 },
    { name: 'VenasK4', avatar: '🧠', score: 1299, rank: 3 },
    { name: 'JoeyPotato', avatar: '🐙', score: 950, rank: 4 },
  ]);
});

app.listen(PORT, () => {
  console.log(`🎪 Trivia server running on port ${PORT}`);
});
