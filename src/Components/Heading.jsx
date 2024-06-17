import React from "react";
import { Typography } from "@mui/material";

function Heading(props) {
  return (
    <Typography variant="h4" style={{ marginBottom: "20px" }}>
      {props.children}
    </Typography>
  );
}

export default Heading;
