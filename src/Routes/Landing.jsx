import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, SnackbarContent } from "@mui/material";

const Landing = () => {
  const [timerCount, setTimerCount] = useState("");
  const [timerDuration, setTimerDuration] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timerCount || !timerDuration) {
      setSnackbarMessage("Please fill all the fields");
      return;
    }
    if (timerCount < 1 || timerDuration < 1) {
      setSnackbarMessage("Please enter valid values");
      return;
    }
    navigate(`/timers/${timerCount}/${timerDuration}`);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Set Timer
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="numTimers"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Number of Timers
            </label>
            <input
              type="number"
              id="numTimers"
              min="1"
              onChange={(e) => setTimerCount(e.target.value)}
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="timerDuration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Duration of Timers in Minutes
            </label>
            <input
              type="number"
              id="timerDuration"
              min="1"
              onChange={(e) => setTimerDuration(e.target.value)}
              className="block w-full p-3 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Start Timer
          </button>
        </form>
      </div>
      <Snackbar
        open={snackbarMessage !== ""}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{ backgroundColor: "red", color: "white" }}
        />
      </Snackbar>
    </div>
  );
};

export default Landing;
