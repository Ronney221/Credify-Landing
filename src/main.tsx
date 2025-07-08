import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import App from "./App.tsx";
import PrivacyPage from "./pages/privacy.tsx";
import FeedbackPage from "./pages/feedback.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/feedback",
    element: <FeedbackPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Analytics />
    <RouterProvider router={router} />
  </React.StrictMode>
);
