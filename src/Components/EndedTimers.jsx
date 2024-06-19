import React from "react";
import { useRecoilValue } from "recoil";
import { endedTimersState } from "../Utils/TimersAtom";

const EndedTimers = () => {
  const endedTimers = useRecoilValue(endedTimersState);

  return (
    <div>
      <h2>Ended Timers</h2>
      {endedTimers.map((timer) => (
        <div key={timer.id}>
          <h3>{timer.name}</h3>
          <p>Ended at: {timer.time} seconds</p>
        </div>
      ))}
    </div>
  );
};

export default EndedTimers;
