const { default: axios } = require("axios");
const validation= require("../helpers");
//Your data modules to make the Axios calls and get the data
const pokemon = async () => { 
    const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return data;
};

const pokemonById = async (id) => {
    await validation.checkId(id);
    let pokemonById = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return pokemonById.data;
 };

module.exports = {
    pokemon,
    pokemonById
};