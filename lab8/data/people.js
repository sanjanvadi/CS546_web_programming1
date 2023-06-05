const { default: axios } = require("axios");

//Axios call to get all data
const getAllPeople = async () => {
    const people = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
    return people.data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    if(typeof searchPersonName!=="string"){
        throw "Error : input not a string";
    }
    if(searchPersonName.trim().length==0){
        throw "Error : empty input detected";
    }
    if (!((/^[a-zA-Z\s]+$/g).test(searchPersonName))) {
        throw "Error : input needs to be letters";
    }
    const people = await getAllPeople();
    let regex = new RegExp(searchPersonName,"gi");
    let res= [];
    people.forEach(e => {
        if((regex.test(e.firstName))||(regex.test(e.lastName))){
            res.push(e)
        }
    });
    if(res.length>20){
    res.length = 20;
    }
    if(res.length>0){
        return res;
    }
    else{
        throw "Error : no people found";
    }
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    const people = await getAllPeople();
    if(!Number.isInteger(parseFloat(id))){
        throw "Error : input is not a integer";
    }
    if(parseInt(id)<=0 || parseInt(id)>people.length){
        throw "Error : id out of bound"
    }
    let res;
    people.forEach(e => {
        if(e.id==parseInt(id)){
            res=e;
        }
    });
    if(res){
        return res;
    }
    else{
        throw "Error : no person found";
    }
};

module.exports = { searchPeopleByName, searchPeopleByID, getAllPeople};
