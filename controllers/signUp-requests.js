const path = require('path');
const bcrypt = require('bcrypt')
const Schema = require('../models/item.js');


const signUpGet = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','sign-up.html'));   
  res.status(200);
})

const signUpPost =  (async (req,res)=>{

  req.body.masterPassword = await bcrypt.hash(req.body.masterPassword, 10)

  try{
    const item = await Schema.create(req.body);
    console.log(item);
    res.status(200);
    res.redirect('/');
  }catch(error){
    console.log(error);
    res.status(500);
  }
})


module.exports = {
  signUpGet,
  signUpPost
};
