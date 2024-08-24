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

// New color scheme
const colors = ['#6A5ACD', '#FF7F50', '#48D1CC', '#FFD700', '#DA70D6'];
let colorIndex = 0;

const getColor = () => {
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
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

    const datasets = models.map((model) => {
      const data = brands.map(brand => {
        const total = Object.values(brandModelMap.get(brand)).reduce((sum, count) => sum + count, 0);
        const count = brandModelMap.get(brand)[model] || 0;
        return (count / total) * 100; // Calculate percentage
      });
      // Filter out zero or undefined values
      if (data.every(value => value === 0)) {
        return null;
      }
      return {
        label: model,
        data: data,
        backgroundColor: getColor(),
        barPercentage: 1,
        categoryPercentage: 0.8,
      };
    }).filter(dataset => dataset !== null);

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
