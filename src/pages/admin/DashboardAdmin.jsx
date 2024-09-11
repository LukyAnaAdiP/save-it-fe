import React from "react";
import StatsGridAdmin from "../../components/admin/StatsGridAdmin";
import BarChartAdmin from "../../components/admin/BarchartAdmin";
import PieChartAdmin from "../../components/admin/PieChartAdmin";
import VendorList from "./VendorList";

function DashboardAdmin() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <StatsGridAdmin />
        <div className="flex flex-row gap-4 w-full">
          <BarChartAdmin />
          <PieChartAdmin />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <VendorList />
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
