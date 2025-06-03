"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarGroup className="pr-0">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="space-y-8 overflow-hidden">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => router.push(item.url)}
                  className={`p-4 ${
                    isActive
                      ? "border-t-2 border-l-2 border-b-2 border-primary/60 -mr-8 pr-4 translate-x-2 relative"
                      : ""
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`h-8 w-8 ${
                        isActive ? "text-primary fill-primary" : ""
                      }`}
                    />
                  )}
                  <span className={`text-muted-foreground font-normal ${isActive ? "text-primary" : ""}`}>
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
