import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import BackButtons from "../components/BackButtons/BackButtons";
import Pagination from "../components/Pagination/Pagination";
import SearchInput from "../components/SearchInput/SearchInput";
import supabase from "../config/supabaseClient";
import searchJourney from "../functions/searchJourney/searchJourney";

export default function JourneysPage() {
  const { data: journeys } = useLoaderData();
  let { id: pageNum } = useParams();
  let [queryResult, setQueryResult] = useState([]);
  const pages = [
    { name: 'Journeys', href: '/journeys', current: true },
  ]
  return (
    <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <BackButtons pages = { pages }/>
          <h1 className="
          mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-indigo-400
          ">Journeys</h1>
          <p className="mt-4 text-sm text-gray-700">
            A list of all the journeys including their departure station, return
            station, distance (km) and journey duration (min).
          </p>
        </div>
      </div>
      <SearchInput
        onResult={(result) => setQueryResult(result)}
        searchFunc={(searchStr) => searchJourney(supabase, searchStr)}
      />
      {queryResult.length >= 1 && (
        <h3 className="mt-8 text-xl font-semibold text-gray-900">Search results ({queryResult.length}):</h3>
      )}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
            <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Departure station</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Return station</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Distance (km)</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration (min)</th>
                </tr>
                </thead>
              <tbody className="bg-white">
                {(queryResult.length ? queryResult : journeys).map(
                  (journey, journeyIdx) => (
                    <tr key={journey.id} className={journeyIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <Link to={"/station/" + journey.departure_station_id}>
                          {journey.departure_station_name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {" "}
                        <Link to={"/station/" + journey.return_station_id}>
                          {journey.return_station_name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Math.floor(journey.duration_s / 60)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Math.floor(journey.covered_distance_m / 1000)}</td>
                    </tr>
                  )
                )}
              </tbody>
             
            </table>

            {queryResult.length === 0 && (
              <Pagination baseUrl={"/journeys/page/"} activePage={pageNum} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
