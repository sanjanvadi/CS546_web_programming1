const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const validate = require("../helpers");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const createUser = async (
  username, password
) => {
  validate.validateInput(username,password);
  username=username.trim().toLowerCase();
  let hash = await bcrypt.hash(password, saltRounds);
  const userCollection = await users();
  const user = await userCollection.findOne({
    username: username
  });
  if(user!=null){
    if(user.username.toLowerCase()===username.toLowerCase()){
      throw "user with that username already exists";
    }
  }
  let newUser={
    username:username,
    password:hash
  }
  const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId){
      throw 'Error : Could not add user';
    }
  return {userInserted: true};
};

const checkUser = async (username, password) => {

  validate.validateInput(username,password);
  username=username.trim().toLowerCase();
  const userCollection = await users();
  const user = await userCollection.findOne({
    username: username
  });
  if(user===null){
    throw "Either the username or password is invalid";
  }
  let compare=false;
  compare = await bcrypt.compare(password, user.password);
  if(!compare){
    throw "Either the username or password is invalid";
  }
  return {authenticated: true};
};

module.exports = {
  createUser,
  checkUser
};