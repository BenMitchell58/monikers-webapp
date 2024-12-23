import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

// Helper function to sanitize category names for valid CSS class names
const sanitizeCategory = (category) => {
  if (!category) return "";

  return category.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase and replace spaces with dashes
};

const GameRound = () => {
  const {
    roundDeck,
    setRoundDeck,
    teams,
    scores,
    updateScore,
    currentRound,
    setCurrentRound,
    gameConfig,
    currentTeam,
    setCurrentTeam,
  } = useGameContext();

  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Tracks the index of the current card
  const [timeLeft, setTimeLeft] = useState(gameConfig.timeLimit); // Timer for each turn
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      // When time runs out, move to the next team's turn
      nextTeam();
    }
  }, [timeLeft]);

  const correctGuess = () => {
    const currentCard = roundDeck[currentCardIndex];

    // Award points based on the card's point value
    updateScore(currentTeam, currentCard.pointValue);

    // Remove the current card from the round deck
    const newRoundDeck = roundDeck.filter(
      (_, index) => index !== currentCardIndex
    );
    setRoundDeck(newRoundDeck);

    // Check if the round is complete
    if (newRoundDeck.length === 0) {
      nextRound();
    } else {
      // Move to the next card
      nextCard(newRoundDeck);
    }
  };

  const skipCard = () => {
    // Move to the next card without removing the current card
    nextCard(roundDeck);
  };

  const nextCard = (updatedDeck) => {
    // Cycle to the next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % updatedDeck.length);
  };

  const nextTeam = () => {
    const nextTeamIndex = (currentTeam + 1) % teams.length;
    setCurrentTeam(nextTeamIndex); // Update the current team in context
    setTimeLeft(gameConfig.timeLimit); // Reset the timer
    navigate("/ready-screen");
  };

  const nextRound = () => {
    if (currentRound < 3) {
      navigate("/round-end"); // Navigate to Round End Screen
    } else {
      navigate("/end-game"); // End the game after the final round
    }
  };

  return (
    <div className="game-round">
      <h2>{`Team ${currentTeam + 1}'s Turn`}</h2>
      <p className="timer">Time Left: {timeLeft}s</p>
      <div className="card-list">
        <div className="card">
          <h3>{roundDeck[currentCardIndex]?.name}</h3>
          <p
            className={`card-category ${sanitizeCategory(
              roundDeck[currentCardIndex]?.category
            )}`}
          >
            {roundDeck[currentCardIndex]?.category}
          </p>
          <p className="card-description">
            {roundDeck[currentCardIndex]?.description}
          </p>
          <span className="card-points">{`${roundDeck[currentCardIndex]?.pointValue} Points`}</span>
        </div>
      </div>
      <button onClick={correctGuess}>Correct</button>
      <button onClick={skipCard}>Skip</button>
    </div>
  );
};

export default GameRound;
