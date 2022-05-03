const path = require('path');
const bcrypt = require('bcrypt')
const Schema = require('../models/item.js');
const { NULL } = require('mysql/lib/protocol/constants/types');
const { nextTick } = require('process');


const loginGet = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','login.html')); 
})

const loginPost = (async (req,res) =>{
 
    try{
      const item = await Schema.findOne({email: req.body.email});
    
      if(await bcrypt.compare(req.body.masterPassword, item.masterPassword)){
        res.status(200);
        res.cookie('cookie', item._id, { maxAge: 1800000, httpOnly: true });
        res.redirect('/home'); 
      }
      else{
        res.send('<script>alert("your password is wrong"); window.location.href = "/"; </script>');
        res.status(404);
      }

    }catch(error){
        res.send('<script>alert("your email is wrong"); window.location.href = "/"; </script>');
        res.status(404);
    }

})

module.exports = {loginGet, loginPost};