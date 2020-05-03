import React from 'react';

import ClickableImage from './ClickableImage';

interface QProps {
  mapsrc: string;
  states: Array<State>;
}

const Quiz = ({ mapsrc, states }: QProps) => {
  return (
    <div className="quiz-holder">
      <ClickableImage src={mapsrc} />
    </div>
  );
};

export default Quiz;
