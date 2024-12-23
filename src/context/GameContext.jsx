import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameConfig, setGameConfig] = useState({});
  const [teams, setTeams] = useState([]);
  const [deck, setDeck] = useState([]);
  const [roundDeck, setRoundDeck] = useState([]); // Tracks remaining cards in the current round
  const [scores, setScores] = useState([0, 0]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTeam, setCurrentTeam] = useState(0);

  const addCardsToDeck = (cards) => {
    setDeck((prev) => [...prev, ...cards]);
    setRoundDeck((prev) => [...prev, ...cards]); // Initialize roundDeck when deck is set
  };

  const updateScore = (teamIndex, points) => {
    setScores((prev) => {
      const updated = [...prev];
      updated[teamIndex] += points;
      return updated;
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameConfig,
        setGameConfig,
        teams,
        setTeams,
        deck,
        addCardsToDeck,
        roundDeck,
        setRoundDeck,
        scores,
        updateScore,
        currentRound,
        setCurrentRound,
        currentTeam,
        setCurrentTeam,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
