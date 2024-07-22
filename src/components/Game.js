import React, { useState, useEffect } from 'react';
import Mole from './Mole';

const Game = () => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      alert(`Game Over! Your score is ${score}`);
      resetGame();
    }
  }, [timeLeft, score]);

  useEffect(() => {
    const popUpInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoles((prev) => {
        const newMoles = [...prev];
        newMoles[randomIndex] = true;
        setTimeout(() => {
          setMoles((prev) => {
            const newMoles = [...prev];
            newMoles[randomIndex] = false;
            return newMoles;
          });
        }, 1000);
        return newMoles;
      });
    }, 1000);

    return () => clearInterval(popUpInterval);
  }, [moles.length]); // Added moles.length as a dependency

  const handleWhack = (index) => {
    if (moles[index]) {
      setScore((prev) => prev + 1);
      setMoles((prev) => {
        const newMoles = [...prev];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  const resetGame = () => {
    setMoles(Array(9).fill(false));
    setScore(0);
    setTimeLeft(30);
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Whack-a-Mole</h1>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}</h2>
      <div className="grid">
        {moles.map((isMoleUp, index) => (
          <Mole 
            key={index} 
            isUp={isMoleUp} 
            onWhack={() => handleWhack(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Game;