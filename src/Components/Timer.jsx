import React, { useState, useEffect } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const Timer = ({ id, name, duration, onRemove, curr }) => {
  const [time, setTime] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timerInterval = null;
    if (isActive && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      onRemove(id, time);
    }
    return () => clearInterval(timerInterval);
  }, [isActive, time, id, onRemove, curr]);

  const handlePause = () => {
    setIsActive(false);
  };

  const handleEnd = () => {
    onRemove(id, time);
    setTime(0);
  };

  const handleResume = () => {
    setIsActive(true);
  };

  return (
    <div className="flex flex-col items-center w-48 p-4 mt-2 bg-indigo-500 border border-gray-300 rounded shadow-md">
      <h2 className="text-lg font-semibold text-white">{name}</h2>
      <h1 className="text-2xl text-white">{formatTime(time)}</h1>
      <div className="flex justify-between w-full mt-2">
        {isActive ? (
          <button className="text-blue-400" onClick={handlePause}>
            <PauseIcon />
          </button>
        ) : (
          <button className="text-green-500" onClick={handleResume}>
            <PlayArrowIcon />
          </button>
        )}
        <button className="text-red-500" onClick={handleEnd}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Timer;
