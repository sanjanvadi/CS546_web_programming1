//Require express and express router as shown in lecture code and worked in previous labs

const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;
const path = require('path');
const { people } = require('../data');

router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve('static/homepage.html'));
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  const searchPersonName=req.body.searchPersonName;
  try {
    if(typeof searchPersonName!=="string"){
      throw "Error : input not a string";
    }
    if(searchPersonName.trim().length==0){
        throw "Error : empty input detected";
    }
    if (!((/^[a-zA-Z\s]+$/g).test(searchPersonName))) {
        throw "Error : input needs to be letters";
    }
  } catch (e) {
    let people={
      title:"People Not Found"
    }
    return res.status(400).render('error',{e,people:people});
  }

  try {
    const result = await peopleData.searchPeopleByName(searchPersonName);
    let people={
      title:"People Found",
      searchPersonName:searchPersonName,
      result:result
    }
    res.status(200).render('peopleFound',{people:people});
  } catch (e) {
    let people={
      title:"People Not Found"
    }
    res.status(500).render('personNotFound',{searchPersonName,people:people});
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  const id=req.params.id;
  try {
    const people = await peopleData.getAllPeople();
    if(!Number.isInteger(parseFloat(id))){
      throw "Error : input is not a integer";
    }
    if(parseInt(id)<=0 || parseInt(id)>people.length){
        throw "Error : id out of bound"
    }
  } catch (e) {
    let people={
      title:"Person Not Found"
    }
    return res.status(400).render('error',{e,people:people});
  }

  try {
    const result = await peopleData.searchPeopleByID(id);
    let people={
      title:"Person Found",
      result:result
    }
    res.status(200).render('personFoundByID',{people:people});
  } catch (e) {
    let people={
      title:"Person Not Found"
    }
    res.status(500).render('personNotFound',{id,people:people});
  }
});

module.exports = router;

