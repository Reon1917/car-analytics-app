import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Function to extract brand and model directly from JSON
const parseBrandAndModel = (car) => {
  const brand = car.NameMMT.split(' ')[0]; // Brand is the first word
  const model = car.Model; // Model is taken directly from the JSON

  return { brand, model };
};

// Generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StackedBarChart = ({ cars }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Extract unique brands and models
    const brandModelMap = new Map();

    cars.forEach(car => {
      const { brand, model } = parseBrandAndModel(car);
      const price = parseFloat(car.Prc.replace(/[^0-9.-]+/g, '')) || 0;

      if (!brandModelMap.has(brand)) {
        brandModelMap.set(brand, {});
      }

      if (!brandModelMap.get(brand)[model]) {
        brandModelMap.get(brand)[model] = 0;
      }

      brandModelMap.get(brand)[model] += price;
    });

    // Convert map to arrays
    const brands = [...brandModelMap.keys()];
    const models = [...new Set(cars.map(car => parseBrandAndModel(car).model))];

    // Create datasets for each model
    const datasets = models.map((model) => {
      return {
        label: model,
        data: brands.map(brand => brandModelMap.get(brand)[model] || 0),
        backgroundColor: getRandomColor(),
      };
    });

    const data = {
      labels: brands, // Brands on the y-axis
      datasets: datasets,
    };

    const options = {
      indexAxis: 'y', // Horizontal bars (brands on y-axis, prices on x-axis)
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Price'
          },
          ticks: {
            autoSkip: false, // Show all labels
            maxRotation: 0, // No rotation for x-axis labels
            minRotation: 0, // No rotation for x-axis labels
            padding: 10, // Add padding to avoid overlap
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Brand'
          },
          ticks: {
            autoSkip: false, // Ensure all brand names are shown
            maxRotation: 0, // No rotation for y-axis labels
            minRotation: 0, // No rotation for y-axis labels
            padding: 10, // Add padding to avoid overlap
          }
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw || 0;
              return `${label}:  ฿${value}`;
            }
          }
        },
        legend: {
          display: true
        }
      }
    };

    // Initialize the chart
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
      <canvas ref={chartRef} width="800" height="600"></canvas>
    </div>
  );
};

export default StackedBarChart;
