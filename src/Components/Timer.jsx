import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

const Timer = ({ id, name, duration, onRemove }) => {
  const [time, setTime] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timerInterval = null;
    if (isActive && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      onRemove(id);
    }
    return () => clearInterval(timerInterval);
  }, [isActive, time, id, onRemove]);

  const handlePause = () => {
    setIsActive(false);
  };

  const handleEnd = () => {
    setTime(0);
    onRemove(id);
  };

  const handleResume = () => {
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box
      border={1}
      borderRadius={4}
      p={2}
      mt={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="200px"
    >
      <Typography variant="h6">{name}</Typography>
      <Typography variant="h4">{formatTime(time)}</Typography>
      <Box mt={2} display="flex" justifyContent="space-between" width="100%">
        {isActive ? (
          <IconButton color="primary" onClick={handlePause}>
            <PauseIcon />
          </IconButton>
        ) : (
          <IconButton color="success" onClick={handleResume}>
            <PlayArrowIcon />
          </IconButton>
        )}
        <IconButton color="error" onClick={handleEnd}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Timer;
