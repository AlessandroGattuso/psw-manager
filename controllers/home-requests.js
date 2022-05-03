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

const signOut = ((req,res)=>{
    res.clearCookie('cookie');
    res.redirect('/');
})

module.exports = {homeGet, signOut};