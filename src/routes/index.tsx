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
import Dashboard from "@/pages/dashboard/Dashboard";
import NotFound from "@/pages/notFound/NotFound";

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
      {
        path: "dashboard",
        element: (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ),
      },
      // {
      //   path: "dashboard",
      //   element: (
      //     <ProtectedRoute>
      //       <DashboardLayout>
      //         <Dashboard />
      //       </DashboardLayout>
      //     </ProtectedRoute>
      //   ),
      // },
      {
        Component: NotFound,
        path: "*",
      },

      //     {/* Catch-all route */}
      //     <Route path="*" element={<NotFound />} />
    ],
  },
]);
