export default function getJourneys(db, limit = 15, pageNum = 1) {
  const startId = limit * (pageNum - 1);
    return db
    .from('trips')
    .select('*')
    .limit(limit)
    .range(startId, limit * pageNum - 1)
  }