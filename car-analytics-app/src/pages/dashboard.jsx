import React, { useEffect, useState } from 'react';
import CarTable from '../components/carTable';
import PieChart from '../components/pieChart';
import StackedBarChart from '../components/barChart';
import carsData from '../data/taladrod-cars.min.json';
import ErrorBoundary from '../components/errorBoundary';

const Dashboard = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(carsData.Cars);
  }, []);

  return (
    <ErrorBoundary>
      <div>
        <h1>Dashboard</h1>
        <CarTable cars={cars} />
        <PieChart cars={cars} />
        <StackedBarChart cars={cars} />
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;