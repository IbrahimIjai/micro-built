import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchInput from "./ui/search-input";
import { Bell } from "lucide-react";
import { NavUser } from "./nav-user";
const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/dummy-pfp.jpg",
    role: "Administrator",
  },
};
export function SiteHeader() {
  return (
    <header className="flex bg-background py-4 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <SearchInput />

        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" className="rounded-full">
            <Bell className="w-4 h-4" />
          </Button>
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  );
}
