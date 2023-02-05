//select * from points where "FID" > 5 and "FID" < 11
export default function getPoints(db, limit = 10, pageNum=1) {
  const startId = limit * (pageNum - 1);
    return db
    .from('points')
    .select('*')
    .range(startId, limit * pageNum - 1)
    // .gt('FID', startId)
    // .limit(limit)
  }