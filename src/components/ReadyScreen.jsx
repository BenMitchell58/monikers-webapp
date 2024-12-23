import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

const ReadyScreen = () => {
  const { currentRound, currentTeam, teams } = useGameContext();
  const navigate = useNavigate();

  const startNextTurn = () => {
    navigate("/game-round");
  };

  return (
    <div className="ready-screen">
      <h1>{`Ready Team ${currentTeam + 1}?`}</h1>
      <h2>{`We are in Round ${currentRound}`}</h2>{" "}
      {/* Show the current round */}
      <button onClick={startNextTurn} className="start-button">
        Start Turn
      </button>
    </div>
  );
};

export default ReadyScreen;
