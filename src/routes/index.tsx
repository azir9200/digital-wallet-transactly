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
import SendMoney from "@/components/dashboard/userDashboard/SendMoney";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebar";
import { userSidebarItems } from "./userSidebar";

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
        Component: FAQ,
        path: "faq",
      },
      {
        Component: About,
        path: "about",
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
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [...generateRoutes(userSidebarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/agent",
    children: [
      {
        Component: SendMoney,
        path: "sendMoney",
      },
    ],
  },

  {
    Component: NotFound,
    path: "*",
  },
]);
