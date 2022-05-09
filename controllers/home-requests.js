const path = require('path');
const Schema = require('../models/item')

const homeGet = (async (req,res)=>{
    const cookie = req.cookies['cookie'];
    if(cookie === undefined){
        res.send('Before you have to login');
    }else{
        const item = await Schema.findOne({_id : cookie});
        res.render('home', {data: {
                                    username: item.firstName,
                                    email: item.email
                                  }});
        res.status(200);
    }   
})

const  addItem = (async (req,res)=>{

   const cookie = req.cookies['cookie'];
   const data = {
        uri: req.body.uri,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
   }
   const item = await Schema.findOneAndUpdate({_id: cookie},{

        $push: { portfolio: data  } },
        function (error, success){
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
   });
    
   console.log(typeof req.body.username)
   console.log(item.portfolio);
});

const signOut = ((req,res)=>{
    res.clearCookie('cookie');
    res.redirect('/');
})

module.exports = {homeGet, addItem, signOut};