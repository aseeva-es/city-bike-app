export default function searchStation(db, searchString) {
    return db
    .from('points')
    .select('*')
    .ilike('Name', '%' + searchString + '%')
     .limit(15)
  }