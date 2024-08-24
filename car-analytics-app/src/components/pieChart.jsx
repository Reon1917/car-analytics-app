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

  // Define a harmonious color palette
  const colorPalette = [
    "#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F",
    "#EDC949", "#AF7AA1", "#FF9DA7", "#9C755F", "#BAB0AC"
  ];

  // Preparing the data for the Pie Chart
  const chartData = {
    labels: Object.keys(brandCounts),
    datasets: [
      {
        data: Object.values(brandCounts),
        backgroundColor: colorPalette.slice(0, Object.keys(brandCounts).length),
        hoverBackgroundColor: colorPalette.slice(0, Object.keys(brandCounts).length),
        borderColor: '#1E1E1E', // Border color to match AMOLED black
        borderWidth: 1, // Border width for better visibility
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
          font: {
            size: 14, // Increase font size for better readability
          },
        },
      },
      tooltip: {
        backgroundColor: '#1E1E1E', // AMOLED black background for tooltips
        titleColor: '#ffffff', // White text color for tooltip title
        bodyColor: '#ffffff', // White text color for tooltip body
        borderColor: '#ffffff', // White border color for tooltip
        borderWidth: 1, // Border width for tooltip
      },
    },
    animation: {
      animateScale: true, // Animate scaling of the chart
      animateRotate: true, // Animate rotation of the chart
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