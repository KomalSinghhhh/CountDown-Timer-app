import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import Timer from "../Components/Timer";
import Heading from "../Components/Heading";

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
      });
    }
    setTimers(initialTimers);
  }, [n, duration]);

  const handleRemoveTimer = (id) => {
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
    <Container maxWidth="lg">
      <Heading children="Timers Page" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <Typography variant="h5">Running Timers</Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Box display="flex" flexWrap="wrap">
            {timers.map((timer) => (
              <Box key={timer.id} mr={2} mb={2}>
                <Timer
                  id={timer.id}
                  name={timer.name}
                  duration={timer.duration}
                  onRemove={handleRemoveTimer}
                />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h5">Ended Timers</Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Box display="flex" flexWrap="wrap">
            {endedTimers.map((timer) => (
              <Box key={timer.id} mr={2} mb={2} width="100%">
                <Box border={1} borderRadius={4} p={2} className="timer ended">
                  {timer.name} Ended
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={handleEndAllTimers}
        >
          End All
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearTimers}
        >
          Clear Timers and Return
        </Button>
      </Box>
    </Container>
  );
};

export default TimersPage;
