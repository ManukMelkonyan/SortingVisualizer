import React, { useState } from 'react';
import './popup.css';

export const InfoPopup = ({ value, position }) => {
  // console.log(position);
  return (
    <div
      className="popup-div"
      style={{ left: `${position.x + 5}px`, top: `${position.y - 20}px` }}
    >
      <span>{value}</span>
    </div>
  );
};
