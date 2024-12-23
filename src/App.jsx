import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import StartingScreen from "./components/StartingScreen";
import CardSelection from "./components/CardSelection";
import GameRound from "./components/GameRound";
import EndGame from "./components/EndGame";
import ReadyScreen from "./components/ReadyScreen";
import RoundEndScreen from "./components/RoundEndScreen";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartingScreen />} />
          <Route path="/card-selection" element={<CardSelection />} />
          <Route path="/ready-screen" element={<ReadyScreen />} />
          <Route path="/game-round" element={<GameRound />} />
          <Route path="/round-end" element={<RoundEndScreen />} />{" "}
          {/* Add this */}
          <Route path="/end-game" element={<EndGame />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
