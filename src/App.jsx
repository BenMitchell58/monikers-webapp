import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingScreen from "./components/StartingScreen";
import CardSelection from "./components/CardSelection";
import ReadyScreen from "./components/ReadyScreen";
import GameRound from "./components/GameRound";
import RoundEndScreen from "./components/RoundEndScreen";
import EndGame from "./components/EndGame";

const App = () => {
  return (
    <Router basename="/monikers-webapp">
      {" "}
      {/* Add basename here */}
      <Routes>
        <Route path="/" element={<StartingScreen />} />
        <Route path="/card-selection" element={<CardSelection />} />
        <Route path="/ready-screen" element={<ReadyScreen />} />
        <Route path="/game-round" element={<GameRound />} />
        <Route path="/round-end" element={<RoundEndScreen />} />
        <Route path="/end-game" element={<EndGame />} />
      </Routes>
    </Router>
  );
};

export default App;
