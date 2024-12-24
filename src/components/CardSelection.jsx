import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { DEFAULT_SETTINGS } from "../consts/config";
import { dividePlayersIntoTeams } from "../utils";

const cards = require("../utils/cards.js");

// Helper function to sanitize category names for valid CSS class names
const sanitizeCategory = (category) => {
  if (!category) return "";
  return category.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase and replace spaces with dashes
};

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const CardSelection = () => {
  const { setGameConfig, setTeams, gameConfig, addCardsToDeck, teams } =
    useGameContext();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [usedCards, setUsedCards] = useState([]); // Tracks already selected cards
  const initialCards = useMemo(() => generateRandomCards([]), []);
  const [randomCards, setRandomCards] = useState(initialCards);

  const navigate = useNavigate();

  if (isObjectEmpty(gameConfig)) {
    setGameConfig({
      numPlayers: DEFAULT_SETTINGS.numPlayers,
      cardsPerPlayer: DEFAULT_SETTINGS.cardsPerPlayer,
      timeLimit: DEFAULT_SETTINGS.timeLimit,
    });
    setTeams(dividePlayersIntoTeams(DEFAULT_SETTINGS.numPlayers));
  }

  // Function to generate exactly 10 random cards, excluding already used cards
  function generateRandomCards(excludedCards) {
    const mql = window.matchMedia("(max-width: 600px)");
    const availableCards = cards.filter(
      (card) => !excludedCards.includes(card)
    );

    // Fisher-Yates Shuffle Algorithm
    const shuffled = [...availableCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    // Return 3 cards for small screens, 10 for larger screens
    return shuffled.slice(0, mql.matches ? 3 : 10);
  }

  const refreshCards = () => {
    setRandomCards(generateRandomCards(usedCards)); // Refresh to show a new set of 10 cards
  };

  const selectCard = (card) => {
    if (!selectedCards.includes(card)) {
      if (selectedCards.length < gameConfig.cardsPerPlayer) {
        setSelectedCards([...selectedCards, card]);
      }
    } else {
      setSelectedCards(
        selectedCards.filter((selectCard) => selectCard !== card)
      );
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
      <h5>{`Players: ${gameConfig.numPlayers}, Card per Player: ${gameConfig.cardsPerPlayer}, Time Limit: ${gameConfig.timeLimit}`}</h5>
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
