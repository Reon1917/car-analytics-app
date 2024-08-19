import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import './stylesheets/pieChart.css'; // Import the CSS file

const PieChart = () => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    // Dynamically import the JSON file from the data folder
    import("../data/taladrod-cars.min.json")
      .then((module) => {
        setCarData(module.default.Cars);
      })
      .catch((error) => console.error("Error loading JSON data:", error));
  }, []);

  // Counting the number of cars by brand name (Extracting the brand from NameMMT)
  const brandCounts = carData.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0]; // Extract the brand name
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});

  // Define a color palette
  const colorPalette = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
    "#FF9F40", "#E6194B", "#3CB44B", "#FFE119", "#4363D8",
    "#F58231", "#911EB4", "#46F0F0", "#F032E6", "#BCF60C",
    "#FABEBE", "#008080", "#E6BEFF", "#9A6324", "#FFFAC8",
    "#800000", "#AAFFC3", "#808000", "#FFD8B1", "#000075",
    "#808080", "#FFFFFF", "#000000"
  ];

  // Preparing the data for the Pie Chart
  const chartData = {
    labels: Object.keys(brandCounts),
    datasets: [
      {
        data: Object.values(brandCounts),
        backgroundColor: colorPalette.slice(0, Object.keys(brandCounts).length),
        hoverBackgroundColor: colorPalette.slice(0, Object.keys(brandCounts).length),
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#ffffff', // White text color for legend
        },
      },
      tooltip: {
        backgroundColor: '#000000', // AMOLED black background for tooltips
        titleColor: '#ffffff', // White text color for tooltip title
        bodyColor: '#ffffff', // White text color for tooltip body
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h2 className="chart-title">Cars by Brand</h2>
      <div className="pie-chart-wrapper">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChart;