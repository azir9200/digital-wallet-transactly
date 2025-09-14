import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/api/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Home, LogOut, User } from "lucide-react";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <Sidebar {...props} className="border-r">
      {/* Logo */}
      <SidebarHeader className="items-center p-2"></SidebarHeader>

      {/* User profile */}
      <div className="flex flex-col items-center gap-2 px-4 border-b">
        <Avatar className="h-16 w-16">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userData?.data?.name?.charAt(0) || <User />}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-medium">{userData?.data?.name || "User"}</h3>
          <p className="text-xs text-muted-foreground">
            {userData?.data?.role || "Role"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <SidebarContent className="px-2">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2 py-1">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {group.items.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  end
                  className={({ isActive }) =>
                    `block w-full rounded-md px-3 py-2 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />

      {/* Logout */}
      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 text-sm hover:text-destructive"
        >
          <Link to="/">
            <Home size={16} />
          </Link>
        </Button>
      </SidebarFooter>
      {/* Logout */}
      <SidebarFooter className="">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center gap-2 text-sm hover:text-destructive hover:border-destructive"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
