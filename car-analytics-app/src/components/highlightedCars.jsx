import React, { useState, useEffect } from 'react';
import '/src/App.css';

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    import('../data/taladrod-cars.min.json')
      .then((module) => {
        const carData = module.default;
        const filteredCars = carData.Cars.filter(car => savedFavorites.includes(car.Cid));
        setHighlightedCars(filteredCars);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  const removeCarFromHighlight = (car) => {
    const updatedCars = highlightedCars.filter(c => c.Cid !== car.Cid);
    setHighlightedCars(updatedCars);
    const updatedFavorites = updatedCars.map(c => c.Cid);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="highlighted-cars-page">
      <header className="hero-section">
        <h1>Favourite Vehicles</h1>
        <p>Explore your top picks for the best vehicles on sale.</p>
      </header>
      <div className="filters-sorters">
        {/* Implement sorting and filtering options here */}
      </div>
      <div className="car-grid">
        {highlightedCars.length === 0 ? (
          <p>Add some cars here to display them</p>
        ) : (
          highlightedCars.map(car => (
            <div className="car-card" key={car.Cid}>
              <div className="car-image-wrapper">
                <img 
                  src={car.Img600} 
                  alt="Car" 
                  className="car-image" 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }} 
                />
              </div>
              <div className="car-info">
                <h3>{car.NameMMT} - {car.Model}</h3>
                <p className="car-price">฿{car.Prc}</p>
                <p>Year: {car.Yr}</p>
                <p>Province: {car.Province}</p>
                <p>Status: {car.Status}</p>
                <div className="car-actions">
                  <button className="remove-button" onClick={() => removeCarFromHighlight(car)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HighlightedCars;