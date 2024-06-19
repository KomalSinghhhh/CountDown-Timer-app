import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { activeTimersState, endedTimersState } from "../Utils/TimersAtom";
import Timer from "../Components/Timer";

const TimersPage = () => {
  const { timerCount, timerDuration } = useParams();
  const setActiveTimers = useSetRecoilState(activeTimersState);
  const [activeTimers, setActiveTimersState] =
    useRecoilState(activeTimersState);
  const [endedTimers, setEndedTimers] = useRecoilState(endedTimersState);
  const remainingTimesRef = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const timers = Array.from(
      { length: parseInt(timerCount, 10) },
      (_, index) => ({
        id: index,
        name: `Team ${index + 1}`,
        duration: parseInt(timerDuration, 10),
      })
    );
    setActiveTimers(timers);
  }, [timerCount, timerDuration, setActiveTimers]);

  const endAllTimers = () => {
    setEndedTimers((prev) =>
      prev.concat(
        activeTimers.map((timer) => ({
          ...timer,
          remainingTime:
            remainingTimesRef.current[timer.id] || timer.duration * 60,
        }))
      )
    );
    setActiveTimersState([]);
  };

  const clearTimersAndReturn = () => {
    setActiveTimersState([]);
    setEndedTimers([]);
    navigate("/");
  };

  const getRemainingTime = (id, time) => {
    remainingTimesRef.current[id] = time;
  };

  const sortedEndedTimers = [...endedTimers].sort(
    (a, b) => b.remainingTime - a.remainingTime
  );

  return (
    <div className="min-h-screen p-10 mx-auto size-auto bg-gradient-to-r from-indigo-500 to-purple-500">
      <h1 className="mb-6 text-3xl font-bold text-white">Timers</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1 p-4 border-gray-300 rounded md:col-span-2 bg-[#a78bfa]">
          <h2 className="text-lg font-semibold text-white">Running Timers</h2>
          <hr className="my-2" />
          <div className="flex flex-wrap">
            {activeTimers.map((timer) => (
              <div key={timer.id} className="m-4">
                <Timer
                  id={timer.id}
                  name={timer.name}
                  duration={timer.duration}
                  getRemainingTime={getRemainingTime}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-[#a78bfa] border-gray-300 rounded">
          <h2 className="text-lg font-semibold text-white">Ended Timers</h2>
          <hr className="my-2" />
          <div className="flex flex-wrap">
            {sortedEndedTimers.map((timer) => (
              <div key={timer.id} className="w-full mb-2 mr-2">
                <div className="flex justify-center p-2 text-white bg-indigo-500 border rounded-md shadow-md">
                  {timer.name} ended at {Math.floor(timer.remainingTime / 60)}:
                  {timer.remainingTime % 60 < 10
                    ? `0${timer.remainingTime % 60}`
                    : timer.remainingTime % 60}{" "}
                  minutes
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-700"
          onClick={endAllTimers}
        >
          End All
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-700"
          onClick={clearTimersAndReturn}
        >
          Clear Timers and Return
        </button>
      </div>
    </div>
  );
};

export default TimersPage;
