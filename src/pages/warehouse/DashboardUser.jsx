import React from "react";
import SidebarDashboard from "../../components/warehouse/SidebarWarehouse";
import DashboardStatsGrid from "../../components/warehouse/DashboardStatsGrid";
import TransactionChart from "../../components/warehouse/TransactionChart";
import CategoryChart from "../../components/warehouse/CategoryChart";
import TransactionHistoryList from "../../components/warehouse/TransactionHistoryList";

export default function DashboardUserPage() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <DashboardStatsGrid />
        <div className="flex flex-row gap-4 w-full">
          <TransactionChart />
          <CategoryChart />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TransactionHistoryList />
        </div>
      </div>
    </>
  );
}
