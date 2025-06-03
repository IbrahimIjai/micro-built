
import { SectionCardsAdminDashboad } from "@/ui/admin-dashboard/section-cards";
import LoanDisbursementChartAdmin from "@/ui/admin-dashboard/chart-area-intective";
import LoanRequestTableAdminDashboard from "@/ui/admin-dashboard/loan-request-table";
import RepaymentTableAdminDashboard from "@/ui/admin-dashboard/loan-repaymeny-table";
import { LoanOverviewPieChart } from "@/ui/admin-dashboard/loan-overview-piechart";
import InventoryAlertsCard from "@/ui/admin-dashboard/inventory-alert-card";
import CustomerStatsCard from "@/ui/admin-dashboard/customer-stats-card";
import { SiteSubHeader } from "@/components/site-sub-header";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SiteSubHeader 
              breadcrumbs={[{ label: "Dashboard", isCurrentPage: true }]}
              rightContent={
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Download Report
                </Button>
              }
            />
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
