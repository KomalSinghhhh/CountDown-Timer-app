// src/Landing.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import Heading from "../Components/Heading";

const Landing = () => {
  const [timerCount, setTimerCount] = useState("");
  const [timerDuration, setTimerDuration] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/timers/${timerCount}/${timerDuration}`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Heading children="Set Timer"></Heading>
      <form onSubmit={handleSubmit}>
        <TextField
          type="number"
          value={timerCount}
          onChange={(e) => setTimerCount(e.target.value)}
          placeholder="Enter number of timers"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          value={timerDuration}
          onChange={(e) => setTimerDuration(e.target.value)}
          placeholder="Enter timer duration in minutes"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Landing;
