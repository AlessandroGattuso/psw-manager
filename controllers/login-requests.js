const express = require("express")
const path = require('path');
const app = express();

const login = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','login.html')); 
})

module.exports = {login};