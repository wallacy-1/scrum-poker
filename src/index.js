import React from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import Home from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Room from "./pages/room";
import { ChangeNameModalProvider, ChangeChoiceModalProvider } from "./contexts";
import { Analytics } from "@vercel/analytics/react";
import "./i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChangeNameModalProvider>
    <ChangeChoiceModalProvider>
      <RouterProvider router={router} />
      <Analytics />
    </ChangeChoiceModalProvider>
  </ChangeNameModalProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
