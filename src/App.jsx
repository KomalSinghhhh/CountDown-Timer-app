import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Routes/Landing";
import TimersPage from "./Routes/TimersPage";

const App = () => (
  <RecoilRoot>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/timers/:timerCount/:timerDuration"
          element={<TimersPage />}
        />
      </Routes>
    </Router>
  </RecoilRoot>
);

export default App;
