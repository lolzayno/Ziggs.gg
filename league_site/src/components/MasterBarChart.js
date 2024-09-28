import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

//Register the necessary components for the Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function MasterBarChart({ labels, data, backgroundcolor, bordercolor, x, y, height, width }) {
  // Define chart data
  const chartData = {
    labels: labels, // The labels for each bar
    datasets: [
      {
        data: data, // Data values for each bar
        backgroundColor: backgroundcolor, // Color for the bars
        borderColor: bordercolor, // Border color of the bars
        borderWidth: 1, // Border width of the bars
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false, // Allows custom width and height
    plugins: {
      legend: {
        display: false, // Show legend
        position: 'top', // Position of the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start x-axis at zero
        title: {
          display: true,
          text: x, // Label for the x-axis
        },
      },
      y: {
        beginAtZero: true, // Start y-axis at zero
        title: {
          display: true,
          text: y, // Label for the y-axis
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div className="w-full" style={{ height: height, width: width}}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default MasterBarChart;
