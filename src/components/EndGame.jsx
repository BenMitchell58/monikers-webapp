import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import Scoreboard from "./Scoreboard";

const EndGame = () => {
  const { scores, teams } = useGameContext();
  const navigate = useNavigate();

  const winningTeamIndex = scores.indexOf(Math.max(...scores));

  const restartGame = () => {
    navigate("/");
  };

  return (
    <div className="end-game">
      <h1>Game Over!</h1>
      <h2>Winning Team: {teams[winningTeamIndex].join(", ")}</h2>
      <Scoreboard />
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default EndGame;
