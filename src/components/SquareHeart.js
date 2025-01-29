import React, { useState, useEffect } from 'react';
import '../styles/SquareHeart.css';

const SquareHeart = ({ progress }) => {
  const [filledSquares, setFilledSquares] = useState(new Set());
  const [squareColors, setSquareColors] = useState({});
  
  // Array of different red/pink shades
  const colors = [
    '#FF0000', // Red
    '#FF1493', // Deep Pink
    '#FF69B4', // Hot Pink
    '#FFB6C1', // Light Pink
    '#FF4466', // Strawberry
    '#FF6B6B', // Light Red
    '#FF007F', // Rose
    '#FF66B2', // Pink
  ];

  const heartPattern = [
    [0,0,2,2,0,0,2,2,0,0],    // Row 1
    [0,2,1,1,2,2,1,1,2,0],    // Row 2
    [2,1,1,1,1,1,1,1,1,2],    // Row 3
    [2,1,1,1,1,1,1,1,1,2],    // Row 4
    [2,1,1,1,1,1,1,1,1,2],    // Row 5
    [0,2,1,1,1,1,1,1,2,0],    // Row 6
    [0,0,2,1,1,1,1,2,0,0],    // Row 7
    [0,0,0,2,1,1,2,0,0,0],    // Row 8
    [0,0,0,0,2,2,0,0,0,0],    // Row 9
  ];

  // Get all fillable positions (value === 1)
  const fillablePositions = heartPattern.reduce((acc, row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 1) {
        acc.push([rowIndex, colIndex]);
      }
    });
    return acc;
  }, []);

  useEffect(() => {
    const totalInnerSquares = fillablePositions.length;
    const squaresToFill = Math.floor((progress / 100) * totalInnerSquares);
    
    // If we need to add more filled squares
    if (squaresToFill > filledSquares.size) {
      const newFilledSquares = new Set(filledSquares);
      const newSquareColors = { ...squareColors };
      
      // Add random squares until we reach the target number
      while (newFilledSquares.size < squaresToFill) {
        const remainingPositions = fillablePositions.filter(
          pos => !newFilledSquares.has(`${pos[0]}-${pos[1]}`)
        );
        const randomIndex = Math.floor(Math.random() * remainingPositions.length);
        const [row, col] = remainingPositions[randomIndex];
        const key = `${row}-${col}`;
        newFilledSquares.add(key);
        
        // Only assign a color if it hasn't been assigned yet
        if (!newSquareColors[key]) {
          newSquareColors[key] = colors[Math.floor(Math.random() * colors.length)];
        }
      }
      
      setFilledSquares(newFilledSquares);
      setSquareColors(newSquareColors);
    }
  }, [progress, fillablePositions]);

  return (
    <div className="heart-container">
      {heartPattern.map((row, rowIndex) => (
        <ul key={rowIndex}>
          {row.map((value, colIndex) => {
            let className = 'square ';
            let style = {};
            const key = `${rowIndex}-${colIndex}`;
            
            if (value === 2) {
              className += 'outline';
            } else if (value === 1) {
              if (filledSquares.has(key)) {
                className += 'filled';
                style.backgroundColor = squareColors[key];
              } else {
                className += 'empty-inner';
              }
            } else {
              className += 'empty';
            }
            
            return (
              <li 
                key={key}
                className={className}
                style={style}
              />
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default SquareHeart; 