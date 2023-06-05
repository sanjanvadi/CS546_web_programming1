/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const movies = require('./data/movies');
const connection = require('./config/mongoConnection');

const main = async () => {
  const db = await connection.dbConnection();
  await db.dropDatabase();
  
  try {
    const movie = await movies.createMovie("Ia", "Limitless are blamed for making a virus that will capsize five oil tankers.", ["srsssd"], "PG", "united airline", "Ian Softley", ["jon snow", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "03/30/2000", "1h 40min");
    console.log(movie);
  } catch (e) {
    console.log(e);
  }

  // try {
  //     const movie = await movies.getMovieById("633fa0564974c2edfc192eeb");
  //     console.log(movie);
  // } catch (e) {
  //     console.log(e);
  // }


  // try {
  //   const movie = await movies.getAllMovies();
  //   console.log(movie);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //     const res = await movies.renameMovie("633fa0564974c2edfc192eeb", "F1234"); 
  //     console.log(res);
  // } catch (e) {
  //     console.log(e);
  // }

  // try {
  //     const res = await movies.removeMovie("  633e2bbab3ff0c6953e39e48  "); 
  //     console.log(res); 
  // } catch (e) {
  //     console.log(e);
  // }

  connection.closeConnection();
}
main();