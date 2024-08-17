import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StackedBarChart = ({ cars }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: cars.map(car => car.model), // Use car models as labels
      datasets: [
        {
          label: 'Brand1',
          data: cars.filter(car => car.brand === 'Brand1').map(car => car.value), // Filter and map data for Brand1
          backgroundColor: '#FF6384',
        },
        {
          label: 'Brand2',
          data: cars.filter(car => car.brand === 'Brand2').map(car => car.value), // Filter and map data for Brand2
          backgroundColor: '#36A2EB',
        },
      ],
    };

    const options = {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    const stackedBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    return () => {
      stackedBarChart.destroy();
    };
  }, [cars]);

  return (
    <div>
      <h2>Stacked Bar Chart</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StackedBarChart;