import { SELECTION, useGameState } from '../context';

const GameComplete = (): JSX.Element => {
  const { score, setPhase } = useGameState();

  const phrase = () => {
    if (score === 50) return 'PERFECT! 👍😎';
    if (score >= 45) return 'Almost there 👍';
    if (score >= 35) return 'Not bad 🤨';

    return 'Oh dear 🤔';
  };

  return (
    <div id="game-complete">
      <h2>Score: {score}</h2>
      <h2>{phrase()}</h2>
      <button className="btn-large" onClick={() => setPhase(SELECTION)}>
        Restart
      </button>
    </div>
  );
};

export default GameComplete;
