import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="
          mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-indigo-400
          ">Oops!</h1>
          <p className="mt-4 text-sm text-gray-700">Sorry, an unexpected error has occurred.</p>
          <p className="mt-4 text-sm text-gray-700">
          {error.statusText || error.message}
          </p>
        </div>
      </div>
      </div>
  );
}
    // <div id="error-page">
    //   <h1>Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <p>
    //     <i>{error.statusText || error.message}</i>
    //   </p>
    // </div>