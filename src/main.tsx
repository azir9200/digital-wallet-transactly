// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

import { persistor, store } from "./redux/store.ts";
import { router } from "./routes/index.tsx";
import { ThemeProvider } from "./providers/theme.providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster richColors />
        </PersistGate>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
