import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "../Components/Timer";
import Heading from "../Components/Heading";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const TimersPage = () => {
  const { n, duration } = useParams();
  const [timers, setTimers] = useState([]);
  const [endedTimers, setEndedTimers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initialTimers = [];
    const initialDuration = Number(duration) * 60;
    for (let i = 0; i < Number(n); i++) {
      initialTimers.push({
        id: i + 1,
        name: `Team ${i + 1}`,
        duration: initialDuration,
        curr: initialDuration,
      });
    }
    setTimers(initialTimers);
  }, [n, duration]);

  const handleRemoveTimer = (id, endTime) => {
    const endedTimer = timers.find((timer) => timer.id === id);
    setTimers(timers.filter((timer) => timer.id !== id));
    if (endedTimers.find((timer) => timer.id === id)) return;
    setEndedTimers([...endedTimers, endedTimer]);
  };

  const handleEndAllTimers = () => {
    const ended = timers.filter(
      (timer) => !endedTimers.some((endedTimer) => endedTimer.id === timer.id)
    );

    setEndedTimers((prevEndedTimers) => [...prevEndedTimers, ...ended]);
    setTimers([]);
  };

  const handleClearTimers = () => {
    setTimers([]);
    setEndedTimers([]);
    navigate("/");
  };

  return (
    <div className="min-h-screen size-auto p-10 mx-auto ... bg-gradient-to-r from-indigo-500 to-purple-500 ">
      <Heading>Timers</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        <div className="col-span-1 p-4 border-gray-300 rounded md:col-span-2 bg-[#a78bfa]">
          <h2 className="text-lg font-semibold text-white">Running Timers</h2>
          <hr className="my-2" />
          <div className="flex flex-wrap ">
            {timers.map((timer) => (
              <div key={timer.id} className="m-4">
                <Timer
                  id={timer.id}
                  name={timer.name}
                  duration={timer.duration}
                  curr={timer.curr}
                  onRemove={handleRemoveTimer}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-[#a78bfa] border-gray-300 rounded">
          <h2 className="text-lg font-semibold text-white">Ended Timers</h2>
          <hr className="my-2" />
          <div className="flex flex-wrap">
            {endedTimers.map((timer) => (
              <div key={timer.id} className="w-full mb-2 mr-2">
                <div className="flex justify-center p-2 text-white bg-indigo-500 border rounded-md shadow-md timer ended">
                  {timer.name} Ended
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-700"
          onClick={handleEndAllTimers}
        >
          End All
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-700"
          onClick={handleClearTimers}
        >
          Clear Timers and Return
        </button>
      </div>
    </div>
  );
};

export default TimersPage;
