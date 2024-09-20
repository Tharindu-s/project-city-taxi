"use client";
import React, { useState } from "react";
import "./ToggleSwitch.css"; // Make sure to include your CSS file

const ToggleSwitch = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  const handleToggleChange = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="toggle-wrapper my-24">
      <div>
        <input
          className="toggle-checkbox"
          type="checkbox"
          checked={isAvailable}
          onChange={handleToggleChange}
        />
        <div className="toggle-container">
          <div className="toggle-button">
            <div className="toggle-button-circles-container">
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
              <div className="toggle-button-circle"></div>
            </div>
          </div>
        </div>
        <div className="status-text">{isAvailable ? "Available" : "Busy"}</div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
