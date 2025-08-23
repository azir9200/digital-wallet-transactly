import App from "@/App";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import FAQ from "@/pages/faq/Faq";
import Features from "@/pages/features/Features";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
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
    ],
  },
]);
