import React from "react";
import "../styles/Tooltip.css";

const Tooltip = ({ children, text, position = "top" }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className={`tooltip-text ${position}`}>{text}</span>
    </div>
  );
};

export default Tooltip;
