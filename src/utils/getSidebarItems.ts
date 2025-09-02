import { role } from "@/constant/role";
import { adminSidebarItems } from "@/routes/adminSidebar";
import { agentSidebarItems } from "@/routes/agentSidebar";
import { userSidebarItems } from "@/routes/userSidebar";
import type { TRole } from "@/types/authTypes";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.agent:
      return [...agentSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
