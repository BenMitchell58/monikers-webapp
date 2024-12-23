import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

const RoundEndScreen = () => {
  const {
    teams,
    scores,
    deck,
    setRoundDeck,
    currentRound,
    setCurrentRound,
    setCurrentTeam,
  } = useGameContext();
  const navigate = useNavigate();

  const prepareNextRound = () => {
    setRoundDeck([...deck]); // Reset the roundDeck with the full deck

    // Determine the team with the least points and set as the starting team
    const minScore = Math.min(...scores);
    const startingTeam = scores.indexOf(minScore);
    setCurrentTeam(startingTeam);
  };

  const proceedToNextRound = () => {
    prepareNextRound(); // Ensure roundDeck and starting team are ready
    if (currentRound < 3) {
      setCurrentRound((prevRound) => prevRound + 1); // Increment round safely
    }
    navigate("/ready-screen"); // Go to Ready Screen for the next team's turn
  };

  return (
    <div className="round-end-screen">
      <h1>{`Round ${currentRound} Complete!`}</h1>{" "}
      {/* Show the completed round */}
      <h2>Scores</h2>
      <div className="scoreboard">
        {teams.map((team, index) => (
          <p key={index}>{`Team ${index + 1}: ${scores[index]} points`}</p>
        ))}
      </div>
      <h2>{`Start Round ${currentRound + 1}`}</h2> {/* Show the next round */}
      <button onClick={proceedToNextRound} className="start-button">
        Start Next Round
      </button>
    </div>
  );
};

export default RoundEndScreen;
