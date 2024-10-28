import React, { useState } from 'react';
import Retail from './Retail'; // Ensure the path is correct
import Office from './Office'; // Ensure the path is correct

const PropertySelector = () => {
  // State to track which component to show
  const [showOffice, setShowOffice] = useState(true);
  const [showRetail, setShowRetail] = useState(false);

  // Show office and hide retail
  const showOfficeComponent = () => {
    setShowOffice(true);
    setShowRetail(false);
  };

  // Show retail and hide office
  const showRetailComponent = () => {
    setShowOffice(false);
    setShowRetail(true);
  };

  return (
    <div className="PropertySelector">
      <h1>Property Type</h1>

      {/* Buttons to select Office or Retail */}
      <div>
        <button onClick={showOfficeComponent}>Office</button>
        <button onClick={showRetailComponent}>Retail</button>
      </div>

      {/* Conditional rendering based on state */}
      {showOffice && <Office />} {/* Show Office component if office is selected */}
      {showRetail && <Retail />} {/* Show Retail component if retail is selected */}
    </div>
  );
};

export default PropertySelector;
