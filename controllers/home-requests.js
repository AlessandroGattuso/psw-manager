const path = require('path');
const Schema = require('../models/item')

const homeGet = (async (req,res)=>{
  res.render('home');
  const cookie = req.cookies['cookie'];
  if(cookie === undefined){
      res.send('Before you have to login');
  }else{
      const items = await Schema.findOne({_id : cookie});
      
      res.status(200);
  }   
})

module.exports = homeGet;