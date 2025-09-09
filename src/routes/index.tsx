import App from "@/App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import FAQ from "@/pages/faq/FAQ";
import Features from "@/pages/features/Features";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NotFound from "@/pages/notFound/NotFound";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebar";
import { userSidebarItems } from "./userSidebar";
import { agentSidebarItems } from "./agentSidebar";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types/authTypes";
import { role } from "@/constant/role";
import PersonalQuestionnaires from "@/components/dashboard/userDashboard/personalQues";
import Help from "@/pages/help/Help";
import Career from "@/pages/career/Career";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Career,
        path: "career",
      },
      {
        Component: FAQ,
        path: "faq",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Help,
        path: "help",
      },

      {
        Component: Login,
        path: "login",
      },
      {
        Component: Register,
        path: "register",
      },
    ],
  },
 
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      {
        index: true,
        Component: PersonalQuestionnaires,
      },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [...generateRoutes(agentSidebarItems)],
  },

  {
    Component: NotFound,
    path: "*",
  },
]);
