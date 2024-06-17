import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Routes/Landing";
import TimersPage from "./Routes/TimersPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/timers/:n/:duration" element={<TimersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
