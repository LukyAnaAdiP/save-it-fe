import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorsAndProducts } from "../../redux/features/vendor/vendorSlice";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartAdmin() {
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
            backgroundColor: [
              "rgba(128, 0, 128, 0.5)",
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
              "rgba(255, 255, 0, 0.5)",
              "rgba(255, 165, 0, 0.5)",
              "rgba(255, 0, 255, 0.5)",
              "rgba(128, 128, 128, 0.5)",
              "rgba(0, 128, 0, 0.5)",
              "rgba(0, 0, 128, 0.5)",
              "rgba(128, 0, 0, 0.5)",
              "rgba(128, 128, 0, 0.5)",
            ],
            hoverOffset: 4,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [vendorsData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: "Vendor Product Distribution",
      },
    },
  };

  return (
    <div className="h-[22rem] w-[20rem] bg-white dark:bg-gray-800 dark:text-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <h2 className="text-lg font-semibold">Vendor Products</h2>
      <div className="w-full h-96 flex-1 text-xs dark:text-white">
        {chartData ? (
          <Pie data={chartData} options={options} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
}