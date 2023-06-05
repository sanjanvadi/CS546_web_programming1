//require express, express router and bcrypt as shown in lecture code
const _ = require('lodash')
const express = require('express');
const router = express.Router();
const helper = require('../helpers');
const userData = require('../data/users');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user){
      return res.redirect("/protected");
    }
    else{
      res.render('userLogin',{title:"User Login"});
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user){
      return res.redirect("/protected");
    }
    else{
      res.render('userRegister',{title:"User Registration"});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      helper.validateInput(req.body.usernameInput,req.body.passwordInput);
    } catch (error) {
      return res.status(400).render('userRegister',{title:'User Registration',error});
    }

    try {
      const userResult = await userData.createUser(req.body.usernameInput,req.body.passwordInput);
      if(_.isEqual(userResult,{userInserted: true})){
        return res.redirect("/");
      }
      else{
        return res.status(500).render('userRegister',{title:"User Registration",error:"Internal Server Error"});
      }
    } catch (error) {
      res.status(400).render('userRegister',{title:"User Registration",error});
    }
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    try {
      helper.validateInput(req.body.usernameInput,req.body.passwordInput);
    } catch (error) {
      return res.status(400).render('userLogin',{title:'User Login',error});
    }

    try {
      const userResult = await userData.checkUser(req.body.usernameInput,req.body.passwordInput);
      if(_.isEqual(userResult,{authenticated: true})){
        req.session.user=req.body.usernameInput;
        return res.redirect('/protected')
      }
      else{
        res.status(500).render('userLogin',{title:'User Login',error:"Internal Server Error"});
      }
    } catch (error) {
      res.status(400).render('userLogin',{title:'User Login',error});
    }
  })

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user){
      const userName=req.session.user;
      const dateTime = new Date().toUTCString();
      res.render('private',{title:"Logged-In",userName,dateTime});
    }
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user){
      req.session.destroy();
      res.render('logout',{title:"Logged-Out"})
    }
    else{
      res.redirect('/');
    }
  })

module.exports = router;