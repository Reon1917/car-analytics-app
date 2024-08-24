import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './stylesheets/barChart.css'; // Import the CSS file

// Register the plugin
Chart.register(ChartDataLabels);

const parseBrandAndModel = (car) => {
  const brand = car.NameMMT.split(' ')[0];
  const model = car.Model;
  return { brand, model };
};

const colors = [
  '#1E90FF', // Dodger Blue
  '#FF6347', // Tomato
  '#3CB371', // Medium Sea Green
  '#FFD700', // Gold
  '#9370DB', // Medium Purple
  '#FFA500', // Orange
  '#FF69B4', // Hot Pink
  '#4682B4', // Steel Blue
  '#FF4500', // Orange Red
  '#9ACD32', // Yellow Green
  '#6B8E23', // Olive Drab
  '#CD5C5C', // Indian Red
  '#2E8B57', // Sea Green
  '#B22222'  // Firebrick
];



// Map to keep track of color index for each brand
const brandColorIndexMap = new Map();

const getColor = (brand) => {
  if (!brandColorIndexMap.has(brand)) {
    brandColorIndexMap.set(brand, 0);
  }
  const colorIndex = brandColorIndexMap.get(brand);
  const color = colors[colorIndex];
  brandColorIndexMap.set(brand, (colorIndex + 1) % colors.length);
  return color;
};

const StackedBarChart = ({ cars }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const brandModelMap = new Map();

    cars.forEach(car => {
      const { brand, model } = parseBrandAndModel(car);

      if (!brandModelMap.has(brand)) {
        brandModelMap.set(brand, {});
      }

      if (!brandModelMap.get(brand)[model]) {
        brandModelMap.get(brand)[model] = 0;
      }

      brandModelMap.get(brand)[model] += 1; // Count the occurrences
    });

    const brands = [...brandModelMap.keys()];
    const models = [...new Set(cars.map(car => parseBrandAndModel(car).model))];

    const datasets = brands.flatMap((brand) => {
      const brandData = brandModelMap.get(brand);
      return Object.keys(brandData).map((model) => {
        const total = Object.values(brandData).reduce((sum, count) => sum + count, 0);
        const count = brandData[model] || 0;
        const percentage = (count / total) * 100; // Calculate percentage
        return {
          label: model,
          data: brands.map(b => (b === brand ? percentage : 0)), // Only set data for the current brand
          backgroundColor: getColor(brand),
          barPercentage: 1,
          categoryPercentage: 0.7,
        };
      });
    });

    const data = {
      labels: brands,
      datasets: datasets,
    };

    const options = {
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Brand',
            color: '#FFFFFF',
          },
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
            padding: 10,
            color: '#FFFFFF',
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Percentage',
            color: '#FFFFFF',
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            padding: 10,
            color: '#FFFFFF',
            stepSize: 10,
          },
        },
      },
      plugins: {
        datalabels: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw || 0;
              return `${label}: ${value.toFixed(2)}%`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
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
    <div className="chart-container">
      <h2 className="chart-title">Stacked Bar Chart</h2>
      <canvas ref={chartRef} width="800" height="600"></canvas>
    </div>
  );
};

export default StackedBarChart;