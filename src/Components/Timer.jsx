import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { activeTimersState, endedTimersState } from "../Utils/TimersAtom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CloseIcon from "@mui/icons-material/Close";

const Timer = ({ id, name, duration, getRemainingTime }) => {
  const [time, setTime] = useState(duration * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTimers, setActiveTimers] = useRecoilState(activeTimersState);
  const [endedTimers, setEndedTimers] = useRecoilState(endedTimersState);

  useEffect(() => {
    let timer;
    if (!isPaused && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, time]);

  useEffect(() => {
    if (time === 0) {
      handleEndTimer();
    }
  }, [time]);

  useEffect(() => {
    if (getRemainingTime) {
      getRemainingTime(id, time);
    }
  }, [getRemainingTime, id, time]);

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);

  const handleEndTimer = () => {
    setActiveTimers((prev) => prev.filter((timer) => timer.id !== id));
    setEndedTimers((prev) => [...prev, { id, name, remainingTime: time }]);
  };

  const cancelTimer = () => {
    handleEndTimer();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <div className="flex flex-col items-center w-48 p-4 mt-2 bg-indigo-500 border border-gray-300 rounded shadow-md">
      <h2 className="text-lg font-semibold text-white">{name}</h2>
      <h1 className="text-2xl text-white">{formatTime(time)}</h1>
      <div className="flex justify-between w-full mt-2">
        {isPaused ? (
          <button className="text-green-500" onClick={resumeTimer}>
            <PlayArrowIcon />
          </button>
        ) : (
          <button className="text-blue-400" onClick={pauseTimer}>
            <PauseIcon />
          </button>
        )}
        <button className="text-red-500" onClick={cancelTimer}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Timer;
