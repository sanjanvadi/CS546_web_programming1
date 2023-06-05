//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes

const express = require('express');
const router = express.Router();
const pokemonData = require('../data/pokemon');
const validation = require('../helpers');
router.get("/",async (req, res) => {
    try {
      const pokemonList = await pokemonData.pokemon();
      res.json(pokemonList);
    } catch (e) {
      res.status(500).send(e);
    }
  })

router.get("/:id",async (req, res) => {
   
  let flag;
  try {
      flag = validation.checkId(req.params.id);
      const pokemon = await pokemonData.pokemonById(req.params.id.trim());
      res.json(pokemon);
    } catch (e) { 
      if(flag){
        res.status(404).send("Pokémon Not Found!");
      }
      else{
      res.status(400).send(e);
      }
    }
  })


module.exports = router;