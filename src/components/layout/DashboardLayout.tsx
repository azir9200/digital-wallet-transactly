import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { useGeMEWalletQuery } from "@/redux/api/userApi";

export default function DashboardLayout() {
  const { data } = useGeMEWalletQuery(undefined);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Welcome back, {`${data?.data?.ownerId?.name}`}!
              </h2>
              <p className="text-muted-foreground">
                Here's what's happening with your account today.
              </p>
            </div>
            <div className="sm:mt-0">
              <p className="text-sm text-muted-foreground">
                Last login: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
