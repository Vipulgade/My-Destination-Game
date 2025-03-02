import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Destination Guessing Game</h1>
      <Game />
    </div>
  );
}

export default App;
