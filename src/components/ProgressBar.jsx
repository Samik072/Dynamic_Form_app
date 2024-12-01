import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px" }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "#4caf50",
          height: "10px",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
