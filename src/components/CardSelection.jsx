import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

const cards = require("../utils/cards.js");

// Helper function to sanitize category names for valid CSS class names
const sanitizeCategory = (category) => {
  console.log(category);
  if (!category) return "";
  return category.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase and replace spaces with dashes
};

const CardSelection = () => {
  const { gameConfig, addCardsToDeck, teams } = useGameContext();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [usedCards, setUsedCards] = useState([]); // Tracks already selected cards
  const [randomCards, setRandomCards] = useState(generateRandomCards([]));

  const navigate = useNavigate();

  // Function to generate exactly 10 random cards, excluding already used cards
  function generateRandomCards(excludedCards) {
    const availableCards = cards.filter(
      (card) => !excludedCards.includes(card)
    );
    const shuffled = [...availableCards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); // Always return 10 cards
  }

  const refreshCards = () => {
    setRandomCards(generateRandomCards(usedCards)); // Refresh to show a new set of 10 cards
  };

  const selectCard = (card) => {
    if (
      !selectedCards.includes(card) &&
      selectedCards.length < gameConfig.cardsPerPlayer
    ) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const undoSelection = (card) => {
    setSelectedCards(selectedCards.filter((selected) => selected !== card));
  };

  const confirmSelection = () => {
    addCardsToDeck(selectedCards); // Add selected cards to the game deck
    setUsedCards([...usedCards, ...selectedCards]); // Mark cards as used
    if (currentPlayer < gameConfig.numPlayers - 1) {
      setCurrentPlayer((prev) => prev + 1);
      setSelectedCards([]); // Clear selections for the next player
      setRandomCards(generateRandomCards([...usedCards, ...selectedCards]));
    } else {
      navigate("/ready-screen"); // All players have selected, navigate to the Ready Screen
    }
  };

  return (
    <div className="card-selection">
      <h2>{`Player ${currentPlayer + 1}: Select Your Cards`}</h2>

      {/* Refresh Button */}
      <div className="refresh-container">
        <button className="refresh-button" onClick={refreshCards}>
          Refresh Cards
        </button>
      </div>

      {/* Random Cards to Choose From */}
      <div className="card-list">
        {randomCards.map((card) => (
          <div
            key={card.name}
            className={`card ${selectedCards.includes(card) ? "selected" : ""}`}
            onClick={() => selectCard(card)}
          >
            <h3>{card.name}</h3>
            <p className={`card-category ${sanitizeCategory(card.category)}`}>
              {card.category}
            </p>
            <p className="card-description">{card.description}</p>
            <span className="card-points">{`${card.pointValue} Points`}</span>
          </div>
        ))}
      </div>

      {/* Selected Cards */}
      <div className="selected-cards">
        <h3>Selected Cards:</h3>
        <div className="selected-card-list">
          {selectedCards.map((card) => (
            <div
              key={card.name}
              className="selected-card"
              onClick={() => undoSelection(card)}
            >
              <h4>{card.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        disabled={selectedCards.length < gameConfig.cardsPerPlayer}
        onClick={confirmSelection}
      >
        Confirm
      </button>
    </div>
  );
};

export default CardSelection;
