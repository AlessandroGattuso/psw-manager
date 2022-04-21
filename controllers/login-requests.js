const express = require("express")
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
const login = ((req,res)=>{
  res.render('login');
})

module.exports = {login};