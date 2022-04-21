const express = require("express")
const path = require('path');
const app = express();

app.set('view engine', 'html');
const signUpGet = ((req,res)=>{
  res.render('sign-up');
})

module.exports = {signUpGet};