import React from 'react';
import './ThemeChanger.css';
import Navbar from '../Navbar/navbar';
const colorOptions = [
   // Orange & Red shades
  '#4CAF50','#00ad84ff','#00757cff',
  '#5100ffff',  '#3F51B5',  
   '#673AB7','#9C27B0', '#C2185B', 
  '#76005cff', 
  '#ff0000ff', '#FF5722',
   '#5D4037','#484848ff',
];


function ThemeChanger({closePanel}) {
  const handleColorSelect = (color) => {
    document.documentElement.style.setProperty('--theme-color', color);
      closePanel(); 
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
