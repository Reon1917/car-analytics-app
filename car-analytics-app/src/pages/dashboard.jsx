import React, { useEffect, useState } from 'react';
import CarTable from '../components/carTable';
import PieChart from '../components/pieChart';
import StackedBarChart from '../components/barChart';
import carsData from '../data/taladrod-cars.min.json';
import ErrorBoundary from '../components/errorBoundary';


const Dashboard = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Setting the cars state with data from the JSON file
    setCars(carsData.Cars);
  }, []);

  return (
    <ErrorBoundary>
      <div>
        <h1>Dashboard</h1>
        {/* Displaying the car table */}
        <CarTable cars={cars} />
        {/* Displaying the pie chart */}
        <PieChart cars={cars} />
        {/* Displaying the stacked bar chart */}
        <StackedBarChart cars={cars} />
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
