# City bike App project
This is the implementation of the pre-assignment for Solita Dev Academy Finland 2023. It is a web application that displays data from journeys made with city bikes in the Helsinki Capital area.
I've chosen React for UI and Supabase (supabase.com) as the database and cloud backend. React is the most popular UI library and I feel comfortable using it. Also Create React App starter includes React Testing Library, that is the great benefit for development.
Tailwind.css is being used for fast prototyping and a more functional approach to styling components.
Supabase is the easy way to have a backend in a Cloud. Data volume is pretty big and to save it to the local storage would not be realistic. Another reason for this choice was the relational data that we have, so the SQL type of database is logical choice for that. Supabase allows you to execute serverless functions based on postgres functions, which basically allows you to implement all the backend functionality there. 

## Live demo
Live demo can be found at https://aseeva-es.github.io/city-bike-app

## Implemented features
The purpose of the assignment was to code a web application with a good code, get all recommended features complete, write tests and understandable documentation. I believe, that it was done. Additionally, I have implemented a few extra points:
- Pagination. Implemented for journeys and stations via React Router routes, per page limit is hard-coded.
- Searching. Implemented for both stations and journeys. Search result limit is hard-coded.
- Advanced single station view. I use postgres function to request station information and calculate additional statistics values in a single request. SQL file for the function can be found under `src/sql`. This view takes a couple of seconds to load, just for the reason of having 3M records in the DB, loading spinner would help, but I didn't have enough time to implement it properly.
    - Statistics values are: 
        - The average distance of a journey starting from the station
        - The average distance of a journey ending at the station
- Running backend in Cloud. I decided to use Supabase, it seemed suitable for this project and also I wanted to try it out properly myself.

## Data validation and import
- Supabase has a feature of Importing data directly from a CSV or excel spreadsheets.
- A Node.js script was coded for data validation and filtering, example can be found under `src/data-import`. It helps to filter out journeys that lasted for less than ten seconds and journeys that covered distances shorter than 10 meters. Stations did not require any modifications.

## Tests
The React Testing Library has allowed to create unit tests for the application's componets. Each componet has own `__test__` folder containing unit tests. I didn't have time to do 100% test coverage, but a bunch of unit tests and one integration test was implemented for `src/pages/StationPage`. See below for how to run tests. 
## Prerequisites
For running local development server you have to make sure you have Node.JS >= 14 installed. Follow instructions for your OS at https://nodejs.org/en/download/.
As soon as you get Node.js installed run `npm install` in the project root folder to install all dependencies.

For a fully functional Supabase client, you will need to put an `.env` file into the root project folder (will be send to the reviewer separately).

## Running, building and testing
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.\

