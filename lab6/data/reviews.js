const mongoCollections = require('../config/mongoCollections');
const validateMovie = require('../helpers');
const movie = require('./movies');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  const flag1 = await validateMovie.validateId(movieId);
  const flag2 = await validateMovie.validateReview(reviewTitle,reviewerName,review,rating);
  let current = new Date();
  let month = current.getMonth()+1;
  let year = current.getFullYear();
  let date  =current.getDate();
  if (!((/^[0-9]{2,2}$/).test(month.toString()))) {
    month = "0" + month;
  }
  if (!((/^[0-9]{2,2}$/).test(date.toString()))) {
    date = "0" + date;
  }
  let reviewDate = month + '/' + date + "/" + year;
  movieId=movieId.trim();
  reviewTitle=reviewTitle.trim();
  reviewerName=reviewerName.trim();
  review=review.trim();
  const movieCollection = await movies();
  const newReview={
    _id : new ObjectId(),
    reviewTitle:reviewTitle,
    reviewDate:reviewDate,
    reviewerName:reviewerName,
    review:review,
    rating:rating
  }

  const resOld = await movie.getMovieById(movieId);
  let index = resOld.reviews.length
  const updatedInfo = await movieCollection.updateOne({
    _id: ObjectId(movieId)
  }, {
      $set: { [`reviews.${index}`]:newReview}
  });
  if (updatedInfo.modifiedCount === 0) {
      throw 'Error : could not add review';
  }
  await updateOverallRating(movieId.toString());
  const resNew = await movie.getMovieById(movieId.toString());
  return resNew;
};

const getAllReviews = async (movieId) => {
  const flag1 = await validateMovie.validateId(movieId);
  movieId = movieId.trim();
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({
    _id: ObjectId(movieId)
  });
  if (movie === null) throw 'No movie with that id';
  movie.reviews.forEach(element => {
    element._id=element._id.toString();
  });
  return movie.reviews;

};

const getReview = async (reviewId) => {
  const flag = await validateMovie.validateId(reviewId);
  reviewId=reviewId.trim();
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  let movieId;
  let final;
  movieList.forEach(movie => {
      movie.reviews.forEach(review => {
        review._id=review._id.toString();
        if(review._id.toString()==reviewId){
          movieId=movie._id;
          final = review;
        }
      });
  });
  if(!movieId){
    throw "Error : no review with that ID";
  }
  return final;
};

const removeReview = async (reviewId) => {
  const flag = await validateMovie.validateId(reviewId);
  reviewId=reviewId.trim();
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  const reviewOne = await getReview(reviewId);
  reviewOne._id=ObjectId(reviewOne._id);
  let movieId;
  movieList.forEach(movie => {
    movie.reviews.forEach(review => {
      review._id=review._id.toString();
      if(review._id.toString()==reviewId){
        movieId=movie._id;
      }
    });
  });
  if(!movieId){
    throw "Error : no review with that ID";
  }
  const updatedInfo = await movieCollection.updateOne({
    _id: ObjectId(movieId)
  }, {
      $pull: {reviews :reviewOne}
  });
  if (updatedInfo.modifiedCount === 0) {
      throw 'Error : could not remove review';
  }
  await updateOverallRating(movieId.toString());
  const res = await movie.getMovieById(movieId.toString());
  return res;
};

const updateOverallRating = async(movieId)=>{
  const flag = await validateMovie.validateId(movieId);
  const movieData = await movie.getMovieById(movieId);
  let oldRating = movieData.overallRating;
  let overallRating=0;
  let length = movieData.reviews.length;
  movieData.reviews.forEach(ele => {
    overallRating+=ele.rating
  })
  if(length==0){
    overallRating=0;
  }
  else{
    overallRating=(overallRating/length).toFixed(1);
    overallRating = parseFloat(overallRating);
  }
  const movieCollection = await movies();
  const updatedMovie={
    overallRating:overallRating
  }
  if(overallRating!=oldRating){
    const updatedInfo = await movieCollection.updateOne({
      _id: ObjectId(movieId)
    }, {
        $set: updatedMovie
    });
    if (updatedInfo.modifiedCount === 0) {
        throw 'Error : could not update movie';
    }
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
