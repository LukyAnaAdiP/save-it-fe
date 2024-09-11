import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TransactionChart() {
  const { transactionHistory } = useSelector((state) => state.customerWarehouse);
  const [timeFrame, setTimeFrame] = useState('month');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (transactionHistory) {
      updateChartData();
    }
  }, [transactionHistory, timeFrame, selectedYear, selectedMonth]);

  const updateChartData = () => {
    let labels, dataPoints;

    switch (timeFrame) {
      case 'year':
        labels = Array.from({ length: 12 }, (_, i) => format(new Date(selectedYear, i), 'MMM'));
        dataPoints = Array(12).fill(0);
        transactionHistory.forEach(transaction => {
          const date = parseISO(transaction.transactionDate);
          if (date.getFullYear() === selectedYear) {
            dataPoints[date.getMonth()] += transaction.totalPrice;
          }
        });
        break;
      case 'month':
        const startDate = startOfMonth(new Date(selectedYear, selectedMonth));
        const endDate = endOfMonth(startDate);
        const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
        labels = daysInMonth.map(day => format(day, 'd'));
        dataPoints = Array(daysInMonth.length).fill(0);
        transactionHistory.forEach(transaction => {
          const date = parseISO(transaction.transactionDate);
          if (date.getFullYear() === selectedYear && date.getMonth() === selectedMonth) {
            dataPoints[date.getDate() - 1] += transaction.totalPrice;
          }
        });
        break;
      default:
        labels = [];
        dataPoints = [];
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Expenses",
          data: dataPoints,
          backgroundColor: "rgba(0, 0, 255, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
          }
        }
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(context.raw);
            return `${context.dataset.label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="overflow-hidden h-[22rem] bg-white dark:bg-gray-800 p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <h2 className="text-lg font-semibold">Transaction</h2>
      <div className="mb-4">
        <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} className="mr-2 dark:bg-transparent">
          <option value="year">Year</option>
          <option value="month">Month</option>
        </select>
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="mr-2 dark:bg-transparent">
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        {timeFrame === 'month' && (
          <select className="dark:bg-transparent" value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{format(new Date(2000, i), 'MMMM')}</option>
            ))}
          </select>
        )}
      </div>
      <div className="w-full flex-1 text-xs dark:text-white">
        {chartData && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
}