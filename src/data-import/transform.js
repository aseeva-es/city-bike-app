
/**
 * An example of the validation and transformation 
 * routine for Journeys data set that I used to make 
 * them compatible with Supabase import and filter out 
 * invalid records. Stations did not require any modifications.
 */

import * as csv from "csv";
import { stringify } from 'csv-stringify/sync';
import fs from "fs";

let id = 1;

function pgDate(date) {
  return new Date(date).toISOString().replace('T',' ').replace('Z','');
}

const writer = fs.createWriteStream("./trips-new.csv");

console.time();

fs.createReadStream("./2021.csv")
    .pipe(
        csv.parse({ delimiter: ",", from_line: 2 })
        )
    .pipe(csv.transform((record) => {
        const newRecord = [id, ...record];
        newRecord[1] = pgDate(newRecord[1]);
        newRecord[2] = pgDate(newRecord[2]);
        newRecord[3] = Number(newRecord[3]);
        newRecord[5] = Number(newRecord[5]);
        newRecord[7] = Number(newRecord[7]);
        newRecord[8] = Number(newRecord[8]);
        id++;
        return newRecord;
        }))

  .on("data", function (row) {
    if (Number(row[7]) >= 10 && Number(row[8]) >= 10){
      writer.write(stringify([row], {quoted: false}));
    } 
})
.on("end", function () {
    console.timeEnd();
    console.log("finished");
  })
  .on("error", function (error) {
    console.timeEnd();
    console.log(error.message);
  });

