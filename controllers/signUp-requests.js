const express = require("express")
const path = require('path');
const Schema = require('../models/item.js')
const app = express();

const signUpGet = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','sign-up.html'));   
})

const signUpPost = ((req,res)=>{
  /*if(req.body.ConfirmPassword == req.body.Password){
      const item = await Schema.create(req.body);
  }*/
  res.status(200);
  console.log(res.json(req.body));
  res.redirect('/');
})


module.exports = {
  signUpGet,
  signUpPost
};
