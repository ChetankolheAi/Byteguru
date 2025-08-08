import React from 'react';
import './ThemeChanger.css';

const colorOptions = [
  '#f08800ff', '#FF5722', '#F44336', // Orange & Red shades
  '#4CAF50', '#388E3C', '#00796B', // Green & Teal shades
  '#3F51B5', '#1E88E5', '#1976D2', // Blue shades
  '#9C27B0', '#673AB7', '#C2185B', // Purple & Pink shades
  '#76005cff','#795548', '#5D4037', 
];


function ThemeChanger() {
  const handleColorSelect = (color) => {
    document.documentElement.style.setProperty('--theme-color', color);
    
  };

  return (
    <div className="theme-changer">
      <h4>Select Theme Color:</h4>
      <div className="color-options">
        {colorOptions.map((color) => (
          <button
            key={color}
            className="color-circle"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeChanger;
