import { SiteSubHeader } from "@/components/site-sub-header";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Search } from "lucide-react";
import { NavUser } from "@/components/nav-user";

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/dummy-pfp.jpg",
  role: "Administrator",
};

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
    <div className="flex flex-col h-full">
      <SiteSubHeader 
        breadcrumbs={breadcrumbs}
        rightContent={rightContent}
      />
      
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Customers</h1>
        
        {/* Your customers page content goes here */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p>Customer management interface will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}