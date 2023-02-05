import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BackButtons from "../BackButtons";

const MockedBackButtons = ({ pages }) => {
  return(
  <BrowserRouter>
    <BackButtons pages={pages} />
  </BrowserRouter>
  )
};

describe("BackButtons", () => {
  test("should render list of links", () => {
    render(
     <MockedBackButtons
        pages={[]}
      />
    );
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });
  test("should have link 'Home' ", () => {
    render(
     <MockedBackButtons
        pages={[
          { name: "Stations", href: "/stations", current: false },
          { name: "Station name", href: "/station", current: true },
        ]}
      />
    );
    const linkElement = screen.getByText(/home/i);
    expect(linkElement).toBeInTheDocument();
    const link2Element = screen.getByText(/stations/i);
    expect(link2Element).toBeInTheDocument();
    expect(link2Element.href).toMatch(/\/stations$/);
  });
});
