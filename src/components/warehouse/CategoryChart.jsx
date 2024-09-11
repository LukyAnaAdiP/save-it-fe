import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchWarehouseProducts } from "../../redux/features/customer/customerSlice";
import WaitingAnimation from "../../constant/WaitingAnimation";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {

  const dispatch = useDispatch();
  const { warehouseProducts, status, error } = useSelector((state) => state.customerWarehouse);

  useEffect(() => {
    dispatch(fetchWarehouseProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <WaitingAnimation/>;
  }

  if (status === "failed") {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  // Count products by category
  const categoryCounts = warehouseProducts.reduce((counts, product) => {
    product.goods?.forEach(item => {
      counts[item.goodsCategoryName] = (counts[item.goodsCategoryName] || 0) + 1;
    });
    return counts;
  }, {});

  const labels = Object.keys(categoryCounts);
  const dataValues = Object.values(categoryCounts);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Category Product",
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",  // Red
          "rgba(54, 162, 235, 0.8)",  // Blue
          "rgba(255, 206, 86, 0.8)",  // Yellow
          "rgba(75, 192, 192, 0.8)",  // Teal
          "rgba(153, 102, 255, 0.8)", // Purple
          "rgba(255, 159, 64, 0.8)",  // Orange
          "rgba(0, 255, 127, 0.8)",   // Spring Green
          "rgba(255, 0, 255, 0.8)",   // Magenta
          "rgba(0, 128, 128, 0.8)",   // Teal Dark
          "rgba(128, 0, 128, 0.8)",   // Purple Dark
        ],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.raw;
          },
        },
      },
    },
  };
  return (
    <div className="h-[22rem] w-[20rem] bg-white dark:bg-gray-800 dark:text-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <h2 className="text-lg font-semibold">Category Product</h2>
      <div className="w-full h-96 flex-1 text-xs dark:text-white">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
