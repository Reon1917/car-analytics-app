import React, { useState, useEffect } from 'react';

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    // Load highlighted cars (favorites) from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const favoriteCars = Object.values(savedFavorites);
    setHighlightedCars(favoriteCars);
  }, []);

  const removeCarFromHighlight = (car) => {
    // Remove a car from the highlighted list and update local storage
    const updatedCars = highlightedCars.filter(c => c.Cid !== car.Cid);
    setHighlightedCars(updatedCars);

    // Update the favorites in local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    delete storedFavorites[car.Cid];
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
  };

  return (
    <div>
      <h1>Highlighted Cars</h1>
      {/* UI to display and manage highlighted cars */}
      <ul>
        {highlightedCars.map(car => (
          <li key={car.Cid}>
            {car.NameMMT} - {car.Model}
            <button onClick={() => removeCarFromHighlight(car)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightedCars;