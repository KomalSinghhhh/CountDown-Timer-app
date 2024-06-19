import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { activeTimersState } from "../Utils/TimersAtom";
import Timer from "./Timer";

const ActiveTimers = () => {
  const [activeTimers, setActiveTimers] = useRecoilState(activeTimersState);

  const updateTimerDuration = (id, newDuration) => {
    setActiveTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, duration: newDuration } : timer
      )
    );
  };

  return (
    <div>
      <h2>Active Timers</h2>
      {activeTimers.map((timer) => (
        <Timer
          key={timer.id}
          {...timer}
          updateTimerDuration={updateTimerDuration}
        />
      ))}
    </div>
  );
};

export default ActiveTimers;
