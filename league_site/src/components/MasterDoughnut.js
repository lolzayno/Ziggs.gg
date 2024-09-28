import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register elements required for the Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

function MasterDoughnut({ labels, data, backgroundcolor, bordercolor, label, height, width }) {
  // Define chart data
  const chartData = {
    labels: labels, // The labels for each segment
    datasets: [
      {
        label: label, // Label for the dataset
        data: data, // Data values for each segment
        backgroundColor: backgroundcolor, // Colors for each segment
        borderColor: bordercolor, // Border colors for each segment
        borderWidth: 1, // Border width of each segment
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false, // Allows custom width and height
    plugins: {
      legend: {
        display: true, // Show legend
        position: 'right', // Position of the legend
        align: 'center', // Align the legend to the center
        labels: {
          padding: 10, // Adjust padding between legend items
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
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
    <div className="w-full" style={{ position: 'relative', height: height, width: width }}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}

export default MasterDoughnut;
