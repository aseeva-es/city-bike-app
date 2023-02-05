import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Pagination from "../Pagination";

const MockedPagination = ({ baseUrl, activePage}) => {
    return(
    <BrowserRouter>
      <Pagination baseUrl={baseUrl} activePage={activePage}  />
    </BrowserRouter>
    )
  };

  describe("Pagination", () => {
    it("should render link with text next when page number >= 1 ", () => {
      render(
       <MockedPagination
          baseUrl={"/stations/page/"}
          activePage = {1}
        />
      );
      const linkElement = screen.getByText(/next/i);
      expect(linkElement).toBeInTheDocument();
    });
    it("next link href should end in 'page/2' when page number is 1", () => {
      render(
       <MockedPagination
          baseUrl={"/stations/page/"}
          activePage = {1}
        />
      );
      const linkElement = screen.getByText(/next/i);
      expect(linkElement.href).toMatch(/page\/2$/i)
    });
    it("should render link with text Previous when page numbers >1", () => {
        render(
         <MockedPagination
            baseUrl={"/stations/page/"}
            activePage = {2}
          />
        );
        const linkElement = screen.getByText(/previous/i);
        expect(linkElement).toBeInTheDocument();
      });
    it("previous link href should end in 'page/1' when page number is 2", () => {
        render(
         <MockedPagination
            baseUrl={"/stations/page/"}
            activePage = {2}
          />
        );
        const linkElement = screen.getByText(/previous/i);
        expect(linkElement.href).toMatch(/page\/1$/i)
      });
    it("should not render previous link on the page 1", () => {
      render(
       <MockedPagination
          baseUrl={"/stations/page/"}
          activePage = {1}
        />
      );
      const linkElement = screen.queryByText(/previous/i);
      expect(linkElement).not.toBeInTheDocument();
    });
    it("should render text 'Showing 1 to 15 of all results", () => {
      render(
       <MockedPagination
          baseUrl={"/stations/page/"}
          activePage = {1}
        />
      );
      const paragraphElement = 
      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === "Showing 1 to 15 of all results";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        );
    
        return nodeHasText && childrenDontHaveText;
      });
      expect(paragraphElement).toBeInTheDocument();
    });
    
});