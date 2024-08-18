import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the plugin
Chart.register(ChartDataLabels);

const parseBrandAndModel = (car) => {
  const brand = car.NameMMT.split(' ')[0];
  const model = car.Model;

  return { brand, model };
};

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
        backgroundColor: getRandomColor(),
        barPercentage: 1, // Adjust bar width
        categoryPercentage: 0.8, // Adjust bar width
      };
    }).filter(dataset => dataset !== null); // Remove null datasets

    const data = {
      labels: brands,
      datasets: datasets,
    };

    const options = {
      indexAxis: 'y',
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Brand',
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            padding: 10,
          },
          grace: '5%', // Add some space around the edges
        },
        x: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percentage',
          },
          ticks: {
            stepSize: 10,
          },
          min: 0,
          max: 120, // Increase max value to provide more space
        },
      },
      plugins: {
        datalabels: {
          display: true,
          color: 'white',
          anchor: 'center', // Position the labels at the center of the bars
          align: 'center', // Align the labels at the center of the bars
          formatter: (value, context) => {
            const model = context.dataset.label;
            return value > 0 ? model : '';
          },
          font: {
            weight: 'regular',
            size: 10, // Adjust font size for better readability
          },
          padding: {
            top: 2,
            bottom: 2,
          },
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
    <div>
      <h2>Stacked Bar Chart</h2>
      <canvas ref={chartRef} width="1200" height="800"></canvas> {/* Increase canvas width */}
    </div>
  );
};

export default StackedBarChart;