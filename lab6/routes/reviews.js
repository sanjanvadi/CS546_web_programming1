//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const movies = require('../data/movies');
const reviews =require('../data/reviews')
const validation = require('../helpers');


router.get('/:movieId',async (req, res) => {
    try {
      const flag = await validation.validateId(req.params.movieId);
    } catch (e) {
      return res.status(400).send(e);
    }

    try {
      const flag = await movies.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).send(e);
    }

    try {
      const reviewList = await reviews.getAllReviews(req.params.movieId);
      if(reviewList.length==0){
        return res.status(404).send("No reviews found")
      }
      res.json(reviewList);
    } catch (e) {
      res.status(500).send(e);
    }
  })
router.post('/:movieId',async (req, res) => {
    const reviewData = req.body;
    try {
      const flag = await validation.validateId(req.params.movieId);
    } catch (e) {
      return res.status(400).send(e);
    }

    try {
      const flag = await movies.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).send(e);
    }

    try {
      const reviewList = await reviews.createReview(req.params.movieId,reviewData.reviewTitle,reviewData.reviewerName,reviewData.review,reviewData.rating);
      res.status(200).json(reviewList);
    } catch (e) {
      res.status(500).send(e);
    }
  });

router.get('/review/:reviewId',async (req, res) => {
    const reviewData = req.body;
    try {
      const flag = await validation.validateId(req.params.reviewId);
    } catch (e) {
      return res.status(400).send(e);
    }

    try {
      const review = await reviews.getReview(req.params.reviewId);
      res.status(200).json(review)
    } catch (e) {
      return res.status(404).send(e);
    }
  })
router.delete('/review/:reviewId',async (req, res) => {
    try {
      const flag = await validation.validateId(req.params.reviewId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const flag = await reviews.getReview(req.params.reviewId);
    } catch (e) {
      return res.status(404).json({error: 'review not found'});
    }
    try {
      const result = await reviews.removeReview(req.params.reviewId);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

  module.exports = router;