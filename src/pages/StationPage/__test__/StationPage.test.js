import StationPage from "../StationPage";
import {
    RouterProvider,
    createMemoryRouter
} from "react-router-dom";
import * as React from "react";
import {
    render,
    waitFor,
    screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../components/BackButtons/BackButtons", () => () => <mock-back-buttons />);

const loaderData = {error: {}, data: {"station_info":{"FID":18,"ID":532,"Nimi":"Betonimies","Namn":"Betongblandaren","Name":"Betonimies","Osoite":"Betonimiehenkuja 1","Adress":"Betongblandargränden 1","Kaupunki":"Espoo","Stad":"Esbo","Operaattor":"CityBike Finland","Kapasiteet":16,"x":24.831804,"y":60.180027},"totalstarting":0,"totalending":1,"avgdistancestarting":null,"avgdistanceending":5771}};
const mockedUseLoaderData = ()=>{ return loaderData; };
  
test("event route", async () => {
    const routes = [
        {
            path: "/station/:station",
            element: <StationPage />,
            loader: mockedUseLoaderData,
          },
    ];
  
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/station/534"],
      initialIndex: 1,
    });
  
    render(<RouterProvider router={router} />);
  
    await waitFor(() => screen.getByRole("heading"));
    
    expect(screen.getByRole("heading")).toHaveTextContent(loaderData.data.station_info.Name);
    expect(screen.getAllByText(loaderData.data.station_info.Name).length).toBe(2);
    expect(screen.getByText(loaderData.data.station_info.Adress)).toBeInTheDocument();
  });