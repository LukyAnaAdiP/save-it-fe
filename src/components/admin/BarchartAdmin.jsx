import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorsAndProducts } from "../../redux/features/vendor/vendorSlice";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChartAdmin() {
  const dispatch = useDispatch();
  const vendorsData = useSelector((state) => state.vendor.vendorsAndProducts);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    dispatch(fetchVendorsAndProducts());
  }, [dispatch]);

  useEffect(() => {
    if (vendorsData) {
      const vendorNames = vendorsData.map((vendor) => vendor.vendorDetails.vendorName);
      const productCounts = vendorsData.map((vendor) => vendor.products.length);

      setChartData({
        labels: vendorNames,
        datasets: [
          {
            label: "Total Products",
            data: productCounts,
            backgroundColor: "#3b82f6",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [vendorsData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Products",
        },
      },
      x: {
        title: {
          display: true,
          text: "Vendors",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Vendors and Their Total Products",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h2>Vendor Products</h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}