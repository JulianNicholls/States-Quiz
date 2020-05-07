import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { GameStateProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
