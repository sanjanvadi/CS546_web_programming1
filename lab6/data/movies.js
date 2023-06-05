const mongoCollections = require('../config/mongoCollections');
const validateMovie = require('../helpers');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  const movieCollection = await movies();
  const flag= await validateMovie.validateMovie(title,plot,genres,rating,studio,director,castMembers,dateReleased,runtime);
  title = title.trim();
  plot = plot.trim();
  rating = rating.trim();
  studio = studio.trim();
  director = director.trim();
  dateReleased = dateReleased.trim();
  runtime = runtime.trim();
  genres.forEach(e => {
    e=e.trim();
  });
  castMembers.forEach(e => {
    e=e.trim();
  });
  let newMovie = {
      title: title,
      plot: plot,
      genres: genres,
      rating: rating,
      studio: studio,
      director: director,
      castMembers: castMembers,
      dateReleased: dateReleased,
      runtime: runtime,
      reviews:[],
      overallRating: 0
  };

  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Error : Could not add movie';

  const newId = insertInfo.insertedId.toString();

  const movie = await getMovieById(newId);
  movie._id=movie._id.toString();
  return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  if (!movieList) throw 'Error : Could not get all movies';
  let resMovie=[];
  movieList.forEach(e => {
    resMovie.push({
      _id:e._id,
      title:e.title
    })
  });
  return resMovie;
};

const getMovieById = async (movieId) => {
  const flag = validateMovie.validateId(movieId);
  movieId = movieId.trim();
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({
      _id: ObjectId(movieId)
  });
  if (movie === null) throw 'No movie with that id';
  movie._id=movie._id.toString();
    movie.reviews.forEach(ele => {
      ele._id=ele._id.toString();
    });
  return movie;
};

const removeMovie = async (movieId) => {
  const flag = await validateMovie.validateId(movieId);
  movieId = movieId.trim();
  const movieCollection = await movies();
  const movie = await getMovieById(movieId);
  const deletionInfo = await movieCollection.deleteOne({
      _id: ObjectId(movieId)
  });
  if (deletionInfo.deletedCount === 0) {
      throw `Error : Could not delete movie with id of ${movieId}`;
  }
  return {movieId: movie._id, deleted: true};
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  const flag1 = await validateMovie.validateMovie(title,plot,genres,rating,studio,director,castMembers,dateReleased,runtime);
  const flag2 = await validateMovie.validateId(movieId);
  movieId = movieId.trim();
  title = title.trim();
  plot = plot.trim();
  rating = rating.trim();
  studio = studio.trim();
  director = director.trim();
  dateReleased = dateReleased.trim();
  runtime = runtime.trim();
  genres.forEach(e => {
    e=e.trim();
  });
  castMembers.forEach(e => {
    e=e.trim();
  });
  const movieCollection = await movies();
  const updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
  };

  const updatedInfo = await movieCollection.updateOne({
      _id: ObjectId(movieId)
  }, {
      $set: updatedMovie
  });
  if (updatedInfo.modifiedCount === 0) {
      throw 'Error : could not update movie';
  }
  const res = await getMovieById(movieId);
  res._id=res._id.toString();
  return res;
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie
};