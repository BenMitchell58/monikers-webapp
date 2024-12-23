import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

const StartingScreen = () => {
  const { setGameConfig, setTeams } = useGameContext();
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(2);
  const [cardsPerPlayer, setCardsPerPlayer] = useState(1);
  const [timeLimit, setTimeLimit] = useState(5);

  const dividePlayersIntoTeams = (numPlayers) => {
    const teams = [[], []];
    for (let i = 0; i < numPlayers; i++) {
      teams[i % 2].push(`Player ${i + 1}`);
    }
    return teams;
  };

  const startGame = () => {
    setGameConfig({ numPlayers, cardsPerPlayer, timeLimit });
    setTeams(dividePlayersIntoTeams(numPlayers));
    navigate("/card-selection");
  };

  return (
    <div className="starting-screen">
      <h1>Monikers</h1>
      <div className="form-container">
        <label htmlFor="numPlayers">Number of Players:</label>
        <input
          id="numPlayers"
          type="number"
          value={numPlayers}
          onChange={(e) => setNumPlayers(+e.target.value)}
        />
        <label htmlFor="cardsPerPlayer">Cards Per Player:</label>
        <input
          id="cardsPerPlayer"
          type="number"
          value={cardsPerPlayer}
          onChange={(e) => setCardsPerPlayer(+e.target.value)}
        />
        <label htmlFor="timeLimit">Time Limit (seconds):</label>
        <input
          id="timeLimit"
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(+e.target.value)}
        />
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default StartingScreen;
