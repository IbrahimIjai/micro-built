import { SiteSubHeader } from "@/components/site-sub-header";
import { ActiveLoans } from "@/ui/admin-customer-profile/active-lons";
import { DownloadReportDialogCustomerProfile } from "@/ui/admin-customer-profile/download-report";
import { activeLoans, customerProfile, repaymentHistory  } from "@/ui/admin-customer-profile/dummy-data";
import {
  CustomerProfileCard,
  LoanSummary,
} from "@/ui/admin-customer-profile/profile-detail-cards";
import { RepaymentHistoryTable } from "@/ui/admin-customer-profile/table-repayment-history";

export default async function CustomersPage({
  params,
}: {
  params: {
    customerId: string;
  };
}) {
  const { customerId } =  await params;
  // Define breadcrumbs for this page
  const breadcrumbs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Customers", href: "/admin/customers" },
    {
      label: "Customers Profile",
      isCurrentPage: true,
      href: `/admin/customers/${customerId}`,
    },
  ];

  return (
    <div className="flex flex-col h-full px-4 @container/main py-4 md:py-6 gap-4">
      <SiteSubHeader
        breadcrumbs={breadcrumbs}
        rightContent={<DownloadReportDialogCustomerProfile />}
      />
      <div>
        <CustomerProfileCard customer={customerProfile} />
        <LoanSummary customer={customerProfile} />
        <ActiveLoans loans={activeLoans} />
        <RepaymentHistoryTable history={repaymentHistory} customerName={customerProfile.name} />
      </div>
    </div>
  );
}
