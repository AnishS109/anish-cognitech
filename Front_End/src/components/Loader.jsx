import React from "react";

const Loader = () => {
  const loaderContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Optional background for better contrast
  };

  const spinnerStyle = {
    animation: "spin 1s linear infinite", // This applies the animation
    borderRadius: "50%",
    height: "80px",
    width: "80px",
    borderTop: "8px solid #3498db", // Blue color for the top border
    borderRight: "8px solid transparent", // Transparent right border
    borderBottom: "8px solid transparent", // Transparent bottom border
    borderLeft: "8px solid transparent", // Transparent left border
    boxShadow: "0 0 10px rgba(52, 152, 219, 0.6)", // Glow effect
  };

  return (
    <>
      {/* Inject keyframes for spinning animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={loaderContainerStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </>
  );
};

export default Loader;
