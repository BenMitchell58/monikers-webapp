import React from "react";
import { useGameContext } from "../context/GameContext";

const Scoreboard = () => {
  const { scores, teams } = useGameContext();

  return (
    <div className="scoreboard">
      <h2>Scores</h2>
      {teams.map((team, index) => (
        <p key={index}>
          Team {index + 1}: {scores[index]} points
        </p>
      ))}
    </div>
  );
};

export default Scoreboard;
