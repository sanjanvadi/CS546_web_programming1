//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const movies = require('../data/movies');
const validation = require('../helpers');

router.get('/',async (req, res) => {
    //code here for GET
    try {
      const movieList = await movies.getAllMovies();
      res.json(movieList);
    } catch (e) {
      res.status(500).send(e);
    }
  })
router.post('/',async (req, res) => {
    //code here for POST
    const movieData = req.body;
    try {
      const flag = await validation.validateMovie(movieData.title,movieData.plot,movieData.genres,movieData.rating,movieData.studio,movieData.director,movieData.castMembers,movieData.dateReleased,movieData.runtime);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  
    try {
      const newMovie = await movies.createMovie(movieData.title,movieData.plot,movieData.genres,movieData.rating,movieData.studio,movieData.director,movieData.castMembers,movieData.dateReleased,movieData.runtime);
      res.status(200).json(newMovie);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });


router.get('/:movieId',async (req, res) => {
    //code here for GET
    try {
      req.params.movieId = await validation.validateId(req.params.movieId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const movie = await movies.getMovieById(req.params.movieId);
      res.status(200).send(movie);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
router.delete('/:movieId',async (req, res) => {
    //code here for DELETE
    try {
      req.params.movieId = await validation.validateId(req.params.movieId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const flag = await movies.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json({error: 'Movie not found'});
    }
    try {
      const movie = await movies.removeMovie(req.params.movieId);
      res.status(200).json(movie);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
router.put('/:movieId',async (req, res) => {
    //code here for PUT
    const movieData = req.body;
    try {
      req.params.movieId = await validation.validateId(req.params.movieId);
      const flag = await validation.validateMovie(movieData.title,movieData.plot,movieData.genres,movieData.rating,movieData.studio,movieData.director,movieData.castMembers,movieData.dateReleased,movieData.runtime);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  
    try {
      const flag = await movies.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json({error: 'Movie not found'});
    }
  
    try {
      const updatedMovie = await movies.updateMovie(req.params.movieId,movieData.title,movieData.plot,movieData.genres,movieData.rating,movieData.studio,movieData.director,movieData.castMembers,movieData.dateReleased,movieData.runtime);
      res.status(200).json(updatedMovie);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

  module.exports = router;