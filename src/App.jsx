import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Login from "./Login";
import Taskbar from "./Taskbar";
import PDFGenerator from './Tamplate';

import Retail from './Retail'; // Ensure the path is correct
import Office from './Office'; // Ensure the path is correct
const App = () => {
  const [properties, setProperties] = useState([]); // To hold selected properties
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [isLightMode, setIsLightMode] = useState(false); // Light mode state
  const [selectedCalculator, setSelectedCalculator] = useState(""); // State for selected calculator
  const pdfRef = useRef(); // Reference for PDF generation

  // Function to handle login
  const handleLogin = (username) => {
    console.log("User logged in:", username); // Simulate successful login
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("User logged out."); // Simulate logout
  };

  // Function to generate PDF
  const generatePDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("property.pdf");
    });
  };

  // Toggle light/dark mode
  const handleToggleChange = () => {
    setIsLightMode(!isLightMode);
  };

  // Effect to set body class based on mode
  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode);
  }, [isLightMode]);

  // Handle calculator selection
  const handleCalculatorSelect = (calculator) => {
    setSelectedCalculator(calculator);
  };

  return (
    <div className="real-estate-calculator-container">
      <h1>Realty Entrepreneurship Launchpad</h1>
      <div className="theme-toggle">
        <label htmlFor="toggle" className="toggle-label">
          <input type="checkbox" id="toggle" checked={isLightMode} onChange={handleToggleChange} />
          <span className="slider"></span>
        </label>
        <span className="toggle-text">{isLightMode ? 'Light Mode' : 'Dark Mode'}</span>
      </div>

      {!isLoggedIn ? (
        <Login onLogin={handleLogin} /> // Render login component
      ) : (
        <>
          <Taskbar onSelect={handleCalculatorSelect} />
          <div className="App" ref={pdfRef}>
            <h2>Welcome!</h2>
            <button onClick={handleLogout}>Logout</button>

            {/* Render selected calculator component */}
            
            {selectedCalculator === "retail" && <Retail />}
            {selectedCalculator === "office" && <Office />}
            {selectedCalculator === "job-template" && <PDFGenerator />}

          </div>
        </>
      )}
    </div>
  );
};

export default App;
