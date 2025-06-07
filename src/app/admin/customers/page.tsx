import { SiteSubHeader } from "@/components/site-sub-header";
import { Button } from "@/components/ui/button";
import CustomersTableAdminCustomer from "@/ui/admin-customer/customer-table";
import CustomerSectionCards from "@/ui/admin-customer/section-card";
import { Plus, Search } from "lucide-react";

export default function CustomersPage() {
  // Define breadcrumbs for this page
  const breadcrumbs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Customers", isCurrentPage: true },
  ];

  // Define right side content for the header
  const rightContent = (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search customers..."
          className="h-9 w-[200px] rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <Button size="sm" variant="default">
        <Plus className="mr-1 h-4 w-4" /> Add Customer
      </Button>
    </>
  );

  return (
    <div className="flex flex-col h-full px-4 @container/main py-4 md:py-6 gap-4">
      <SiteSubHeader breadcrumbs={breadcrumbs} rightContent={rightContent} />
      <CustomerSectionCards />
      <CustomersTableAdminCustomer />
    </div>
  );
}
