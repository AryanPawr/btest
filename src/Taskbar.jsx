// Taskbar.js
import React from "react";
import './Taskbar.css'; // Optional: Create a CSS file for styling

const Taskbar = ({ onSelect }) => {
  return (
    <div className="taskbar">
              <button onClick={() => onSelect("home")}>Home</button>
      <button onClick={() => onSelect("retail")}>Retail Calculator</button>
      <button onClick={() => onSelect("office")}>Office Calculator</button>
      <button onClick={() => onSelect("job-template")}>Job Template</button>
    </div>
  );
};

export default Taskbar;
