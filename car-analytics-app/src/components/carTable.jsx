import React from 'react';

const CarTable = ({ cars }) => {
  return (
    <div>
      <h2>Car Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Year</th>
            <th>Province</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.Cid || index}>
              <td>{car.Cid}</td>
              <td>{car.NameMMT.split(' ')[0]}</td> {/* Assuming the brand is the first word in NameMMT */}
              <td>{car.Model}</td>
              <td>{car.Prc}</td>
              <td>{car.Yr}</td>
              <td>{car.Province}</td>
              <td>{car.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;