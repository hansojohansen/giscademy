import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import CvPage from "./pages/CvPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import ConsultingPage from "./pages/ConsultingPage.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cv", element: <CvPage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "consulting", element: <ConsultingPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
