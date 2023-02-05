CREATE OR REPLACE FUNCTION get_station_stats(
    station_id int, 
    OUT station_info   RECORD,
    OUT totalStarting   int,  
    OUT totalEnding   int,
    OUT avgDistanceStarting int,
    OUT avgDistanceEnding int
    ) AS 
$func$
BEGIN
   SELECT INTO station_info
          *
   FROM   points
   WHERE  points."ID" = station_id
   LIMIT 1;

   SELECT INTO totalStarting
          count(*)
   FROM   trips
   WHERE  departure_station_id = station_id;

   SELECT INTO totalEnding
          count(*)     
   FROM   trips
   WHERE return_station_id = station_id;

   SELECT INTO avgDistanceStarting
          AVG(covered_distance_m)  
   FROM   trips
   WHERE departure_station_id = station_id;

   SELECT INTO avgDistanceEnding
          AVG(covered_distance_m)  
   FROM   trips
   WHERE return_station_id = station_id;

END
$func$  LANGUAGE plpgsql;