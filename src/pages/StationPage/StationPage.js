import { useLoaderData } from "react-router-dom";
import BackButtons from "../../components/BackButtons/BackButtons";


export default function StationPage() {
  const { data } = useLoaderData();
  const { station_info: point, totalstarting, totalending, avgdistancestarting, avgdistanceending } = data;

    const pages = [
        { name: 'Stations', href: '/stations', current: false },
        { name: point.Name, href: '/station/' + point.ID , current: true },
      ]

  return (
    <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8">     
    <div className="overflow-hidden bg-white shadow sm:rounded-lg"> 
   
    <div className="px-4 py-5 sm:px-6">
    <BackButtons pages = { pages }/>
       <h1 className=" mt-4
          text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-indigo-400
          ">{point.Name}</h1>
      <p className="mt-4 max-w-2xl text-sm text-gray-500">Station details</p>
    </div>
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Name</dt>
          <dd className="point-name mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ point.Name }</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Address</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ point.Adress }</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Total number of journeys starting from the station</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ totalstarting }</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Total number of journeys ending at the station</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ totalending }</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">The average distance of a journey starting from the station</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ Math.floor(Number(avgdistancestarting) / 1000) } km</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">The average distance of a journey ending at the station</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ Math.floor(Number(avgdistanceending) / 1000) } km</dd>
        </div>

      </dl>
    </div>
  </div>
  </div>
  );
}
