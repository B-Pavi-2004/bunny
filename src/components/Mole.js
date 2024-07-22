import React from 'react';

const Mole = ({ isUp, onWhack }) => {
  return (
    <div className={`mole ${isUp ? 'up' : ''}`} onClick={onWhack}>
      {isUp && '🐹'}
    </div>
  );
};

export default Mole;