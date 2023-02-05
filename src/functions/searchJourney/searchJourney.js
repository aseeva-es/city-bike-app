export default function searchJourney(db, searchString, limit=15) {
    return db
    .from('trips')
    .select('*')
    .or(`departure_station_name.ilike.%${searchString}%, return_station_name.ilike.%${searchString}%`)
    .limit(limit);
  }