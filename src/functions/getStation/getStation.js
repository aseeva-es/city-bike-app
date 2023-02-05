
export default function getStation(db, id) {
    return db.rpc('get_station_stats', { station_id: id });
}



