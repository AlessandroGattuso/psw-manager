const express = require("express")
const path = require('path');
const app = express();

const signUpGet = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','sign-up.html'));   
})

const signUpPost = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','sign-up.html'));   
})


module.exports = {signUpGet};