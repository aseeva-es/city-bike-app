import { Link } from "react-router-dom";

export default function Pagination(props) {
  const prevPage = Number(props.activePage || 1) - 1;
  const nextPage = Number(props.activePage || 1) + 1;
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">15</span> of{" "}
          <span className="font-medium">all</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {
        prevPage > 0 && (
          <Link
            to={props.baseUrl + prevPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Link>
        )
        }

        <Link
          to={props.baseUrl + nextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
