import React, { useEffect, useState } from 'react';

import Quiz from './components/Quiz';

import './App.css';

function App() {
  const [states, setStates] = useState<Array<State>>([]);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await fetch('data/states.json');
        const lstates = await response.json();

        setStates(lstates);
      } catch (e) {
        console.error({ e });
      }
    };

    loadStates();
  }, []);

  return (
    <header>
      <h1>States Quiz</h1>
      <Quiz mapsrc="images/states.png" states={states} />
    </header>
  );
}

export default App;
