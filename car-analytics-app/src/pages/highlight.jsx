import React, { useState, useEffect } from 'react';

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    // Load highlighted cars from local storage when the component mounts
    const savedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(savedCars);
  }, []);

  const addCarToHighlight = (car) => {
    // Add a car to the highlighted list and update local storage
    const updatedCars = [...highlightedCars, car];
    setHighlightedCars(updatedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
  };

  const removeCarFromHighlight = (car) => {
    // Remove a car from the highlighted list and update local storage
    const updatedCars = highlightedCars.filter(c => c.id !== car.id);
    setHighlightedCars(updatedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
  };

  return (
    <div>
      <h1>Highlighted Cars</h1>
      {/* UI to display and manage highlighted cars */}
      <ul>
        {highlightedCars.map(car => (
          <li key={car.id}>
            {car.make} {car.model}
            <button onClick={() => removeCarFromHighlight(car)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Example of how to add a car to highlight */}
      {/* <button onClick={() => addCarToHighlight({ id: 1, make: 'Toyota', model: 'Corolla' })}>Add Toyota Corolla</button> */}
    </div>
  );
};

export default HighlightedCars;
