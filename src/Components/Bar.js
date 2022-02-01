import React, { useState } from "react";
import { InfoPopup } from "./InfoPopup";
import "../Assets/Styles/style.css";

const Bar = ({ value, color }) => {
  const [displayPopup, setDisplayPopup] = useState(false);
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  return (
    <div
      className="bar"
      onMouseOver={(e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setDisplayPopup(true);
      }}
      onMouseOut={(e) => {
        setDisplayPopup(false);
      }}
      style={{ height: `${value}px`, backgroundColor: color }}
    >
      {displayPopup && <InfoPopup position={mousePosition} value={value} />}
    </div>
  );
};

export default Bar;
