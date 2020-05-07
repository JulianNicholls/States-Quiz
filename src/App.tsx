import React from 'react';

import Quiz from './components/Quiz';

import './App.css';

function App() {
  return (
    <header>
      <h1>States Quiz</h1>
      <div className="container">
        <Quiz mapsrc="images/states.png" />
      </div>
    </header>
  );
}

export default App;
