import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { SectionCardsAdminDashboad } from "@/ui/admin-dashboard/section-cards";
import LoanDisbursementChartAdmin from "@/ui/admin-dashboard/chart-area-intective";
import LoanRequestTableAdminDashboard from "@/ui/admin-dashboard/loan-request-table";
import RepaymentTableAdminDashboard from "@/ui/admin-dashboard/loan-repaymeny-table";
import { LoanOverviewPieChart } from "@/ui/admin-dashboard/loan-overview-piechart";
import InventoryAlertsCard from "@/ui/admin-dashboard/inventory-alert-card";
import CustomerStatsCard from "@/ui/admin-dashboard/customer-stats-card";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCardsAdminDashboad />
            <div className="px-4 lg:px-6 gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
              {/* Main content area - full width on mobile, 2/3 on tablet, 5/7 on desktop */}
              <div className="space-y-4 md:col-span-2 lg:col-span-5">
                <LoanDisbursementChartAdmin />

                <div className="mt-4">
                  <LoanRequestTableAdminDashboard />
                </div>
                
                <div className="mt-4">
                  <RepaymentTableAdminDashboard />
                </div>
              </div>

              {/* Sidebar content - stacked below on mobile, 1/3 on tablet, 2/7 on desktop */}
              <div className="space-y-4 md:col-span-1 lg:col-span-2">
                <CustomerStatsCard />
                <LoanOverviewPieChart />
                <InventoryAlertsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
