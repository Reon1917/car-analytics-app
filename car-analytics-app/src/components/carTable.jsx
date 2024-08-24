import React, { useState, useEffect } from 'react';
import './stylesheets/carTable.css'; 
import '/src/App.css';

const aggregateData = (cars) => {
  const brandModelMap = {};

  cars.forEach((car) => {
    const brand = car.NameMMT.split(' ')[0];
    const model = car.Model;
    const price = parseInt(car.Prc.replace(/,/g, ''), 10);

    if (!brandModelMap[brand]) {
      brandModelMap[brand] = { totalCars: 0, models: {} };
    }

    if (!brandModelMap[brand].models[model]) {
      brandModelMap[brand].models[model] = { count: 0, cars: [] };
    }

    brandModelMap[brand].totalCars += 1;
    brandModelMap[brand].models[model].count += 1;
    brandModelMap[brand].models[model].cars.push(car);
  });

  return brandModelMap;
};

const CarTable = ({ cars }) => {
  const aggregatedData = aggregateData(cars);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleModelClick = (brand, model) => {
    setSelectedBrand(brand);
    setSelectedModel(model);
  };

  const toggleFavorite = (car) => {
    setFavorites((prevFavorites) => {
      const carId = car.Cid;  // Ensure Cid is unique for each car
      if (prevFavorites.includes(carId)) {
        return prevFavorites.filter(id => id !== carId);
      } else {
        return [...prevFavorites, carId];
      }
    });
  };

  const isFavorite = (car) => {
    return favorites.includes(car.Cid);
  };

  return (
    <div className="car-table-container">
      <div className="car-table-wrapper">
        <h2>Car Table</h2>
        <div style={{ height: '500px', overflowY: 'scroll' }}>
          <table className="car-table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Number of Cars</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(aggregatedData).map((brand, brandIndex) => (
                <React.Fragment key={brand}>
                  <tr className="brand-row">
                    <td className='brands-text'>{brand}</td>
                    <td></td>
                    <td>{aggregatedData[brand].totalCars}</td>
                  </tr>
                  {Object.keys(aggregatedData[brand].models).map((model, modelIndex) => (
                   <tr key={model} onClick={() => handleModelClick(brand, model)} className={`clickable-row ${modelIndex === 0 ? 'first-model-row' : ''}`}>
                   <td></td>
                   <td className="model-cell">{model}</td>
                   <td>{aggregatedData[brand].models[model].count}</td>
                 </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`details-container ${selectedModel && selectedBrand ? '' : 'hidden'}`}>
        {selectedModel && selectedBrand && (
          <div>
            <h2>{selectedBrand} {selectedModel} Details</h2>
            <div style={{ height: '500px', overflowY: 'scroll' }}>
              <table className="car-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Year</th>
                    <th>Province</th>
                    <th>Status</th>
                    <th>Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregatedData[selectedBrand].models[selectedModel].cars.map((car, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img src={car.Img300} alt="Car" className="car-image" onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }} />
                        </td>
                        <td>{car.Prc}</td>
                        <td>{car.Yr}</td>
                        <td>{car.Province}</td>
                        <td>{car.Status}</td>
                        <td>
                          <button className={`favorite-button ${isFavorite(car) ? 'gold' : ''}`} onClick={() => toggleFavorite(car)}>
                            {isFavorite(car) ? '★' : '☆'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarTable;