import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, LinearProgress } from '@mui/material';

const Game = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const maxWrong = 3;
  const totalTime = 60; // For progress bar percentage

  // Fetch destination data from data.json on component mount
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setDestinations(data))
      .catch((error) => console.error('Error loading destination data:', error));
  }, []);

  // Timer effect: decrease time every second
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      setMessage('Time is up!');
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, gameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver) return;

    // Ensure destination data is loaded before checking the answer
    if (destinations.length === 0) {
      setMessage('Loading destinations, please wait...');
      return;
    }

    // Use the "city" property as the correct answer
    const correctAnswer = destinations[currentIndex].city.toLowerCase();
    if (guess.toLowerCase() === correctAnswer) {
      setMessage(`Correct! ${destinations[currentIndex].city} is the right answer.`);
      // Proceed to next destination if available
      if (currentIndex < destinations.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setGuess('');
          setMessage('');
        }, 2000);
      } else {
        setMessage('Congratulations, you guessed all destinations!');
        setGameOver(true);
      }
    } else {
      setMessage('Wrong answer, try again!');
      const updatedWrongCount = wrongCount + 1;
      setWrongCount(updatedWrongCount);
      setGuess('');
      if (updatedWrongCount >= maxWrong) {
        setMessage('Game over! Too many wrong answers.');
        setGameOver(true);
      }
    }
  };

  // Wait for destination data to load before rendering the game
  if (destinations.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Loading destinations...</Typography>
      </Box>
    );
  }

  if (gameOver) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(156, 207, 223, 0.8)', boxShadow: 7, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>Game Over</Typography>
          <Typography variant="body1" align="center">{message}</Typography>
        </Paper>
      </Box>
    );
  }

  // Display the first clue for the current destination
  const currentDestination = destinations[currentIndex];
  const clue = currentDestination.clues[0];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f0f4f8' }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '90%',
          maxWidth: 500,
          textAlign: 'center',
          backgroundColor: 'rgba(240, 238, 238, 0.9)',
          boxShadow: 7,
          borderRadius: 2
        }}
      >
        <Typography variant="h5" gutterBottom>
          Destination Guessing Game
        </Typography>

        {/* Timer Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Time Left: {timeLeft} seconds</Typography>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / totalTime) * 100}
            sx={{ height: 10, borderRadius: 5, mt: 1 }}
          />
        </Box>

        {/* Wrong Answers Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            Wrong Answers: {wrongCount} / {maxWrong}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(wrongCount / maxWrong) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              mt: 1,
              backgroundColor: '#ffe6e6',
              '& .MuiLinearProgress-bar': { backgroundColor: 'rgba(158, 190, 146, 0.8)' }
            }}
          />
        </Box>

        {/* Clue Box */}
        <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: 'rgba(162, 184, 204, 0.8)' }}>
          <Typography variant="subtitle1" gutterBottom>
            Clue:
          </Typography>
          <Typography variant="body1">{clue}</Typography>
        </Paper>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            placeholder="Enter city name"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Guess
          </Button>
        </form>

        {/* Feedback Message */}
        {message && (
          <Paper elevation={2} sx={{ mt: 3, p: 2, backgroundColor: 'rgba(225, 178, 178, 0.8)' }}>
            <Typography variant="body1">{message}</Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default Game;
