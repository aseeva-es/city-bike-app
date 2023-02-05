import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import supabase from "./config/supabaseClient";
import getPoints from "./functions/getPoints/getPoints";
import getJourneys from "./functions/getJourneys/getJourneys";
import StationsPage from "./pages/StationsPage";
import JourneysPage from "./pages/JourneysPage";
import ErrorPage from "./pages/ErrorPage";
import reportWebVitals from "./reportWebVitals";
import StationPage from "./pages/StationPage/StationPage";
import getStation from "./functions/getStation/getStation";
import StationsList from "./pages/StationsList";
import JourneysList from "./pages/JourneysList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/stations",
    element: <StationsList />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <StationsPage /> ,
        loader: () => getPoints(supabase, 15),
      },
      {
        path: "page/:id",
        element: <StationsPage />,
        errorElement: <ErrorPage />,
        loader: ({ params }) => getPoints(supabase, 15, params.id),
      },
    ]
    
  },
  {
    path: "/station/:station",
    element: <StationPage />,
    loader: ({ params }) => getStation(supabase, params.station),
  },
  {
    path: "/journeys",
    element: <JourneysList />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <JourneysPage /> ,
        loader: () => getJourneys(supabase, 15),
      },
      {
        path: "page/:id",
        element: <JourneysPage />,
        errorElement: <ErrorPage />,
        loader: ({ params }) => getJourneys(supabase, 15, params.id),
      }

    ]
  },
  
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
