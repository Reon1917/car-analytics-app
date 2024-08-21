import React, { useState, useEffect } from 'react';
import carData from '../data/taladrod-cars.min.json'; // Adjust the path to your JSON file

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    // Load highlighted car Cids from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Filter the car data based on the saved Cids
    const filteredCars = carData.Cars.filter(car => savedFavorites.includes(car.Cid));
    setHighlightedCars(filteredCars);
  }, []);

  const removeCarFromHighlight = (car) => {
    // Remove a car from the highlighted list and update local storage
    const updatedCars = highlightedCars.filter(c => c.Cid !== car.Cid);
    setHighlightedCars(updatedCars);

    // Update the favorites in local storage
    const updatedFavorites = updatedCars.map(c => c.Cid);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Highlighted Cars</h1>
      {/* UI to display and manage highlighted cars */}
      <ul>
        {highlightedCars.map(car => (
          <li key={car.Cid}>
            <img src={car.Img300} alt="Car" className="car-image" onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }} />
            <div>{car.NameMMT} - {car.Model}</div>
            <div>Price: {car.Prc}</div>
            <div>Year: {car.Yr}</div>
            <div>Province: {car.Province}</div>
            <div>Status: {car.Status}</div>
            <button onClick={() => removeCarFromHighlight(car)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightedCars;