import { useState } from "react";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButtons from "../components/BackButtons/BackButtons";
import Pagination from "../components/Pagination/Pagination";
import SearchInput from "../components/SearchInput/SearchInput";
import supabase from "../config/supabaseClient";
import searchStation from "../functions/searchStation/searchStation";

export default function StationsPage() {
  const { data: points } = useLoaderData();
  let { id: pageNum } = useParams();
  let [queryResult, setQueryResult] = useState([]);
  const pages = [
    { name: 'Stations', href: '/stations', current: true },

  ]

  return (
    <div className="mx-auto max-w-7xl">
      <div className="p-2 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <BackButtons pages = { pages }/>
            <h1 className=" mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-indigo-400">Stations</h1>
            <p className="mt-4 text-sm text-gray-700">
              A list of all the stations including their ID, staion name, city
              and capacity.
            </p>
          </div>
        </div>
        <SearchInput
          onResult={(result) => setQueryResult(result)}
          searchFunc={(searchStr) => searchStation(supabase, searchStr)}
        />
        {queryResult.length >= 1 && (
          <h3 className="mt-8 text-xl font-semibold text-gray-900">
            Search results ({queryResult.length}):
          </h3>
        )}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
              <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Capacity</th>
                </tr>
                </thead>
                <tbody className="bg-white">

              {(queryResult.length ? queryResult : points).map((point, pointIdx) => (
                <tr key={point.ID} className={pointIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <Link to={"/station/" + point.ID}>{point.ID} </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Link to={"/station/" + point.ID}>{point.Name} </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Link to={"/station/" + point.ID}>{point.Kaupunki} </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Link to={"/station/" + point.ID}>{point.Kapasiteet} </Link>
                  </td>
                </tr>
              ))}

                </tbody>
              </table>
            </div>
            {queryResult.length === 0 && (
              <Pagination baseUrl={"/stations/page/"} activePage={pageNum} />
            )}
            <div id="detail">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
