const path = require('path');
const Schema = require('../models/item')
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

let dictKey = {};
let idK = -1;

const homeGet = (async (req,res)=>{
    const cookie = req.cookies['cookie'];
    if(cookie === undefined){
        res.send('Before you have to login');
    }else{

        const item = await Schema.findOne({_id : cookie});
        const portfolio = item.portfolio;

        portfolio.forEach(function(obj){
            const domain = new URL(obj.uri);
            obj.favicon =  domain.origin + "/favicon.ico";
            obj.title = (obj.uri).replace(/.+\/\/|www.|\..+/g, '')
            obj.uri = domain.origin;
        });

        res.render('home', { 
            name: item.firstName,
            data: portfolio 
        });
        res.status(200);
    }   
})

const  addItem = (async (req,res)=>{

    const cookie = req.cookies['cookie'];

    const hash = await bcrypt.hash(req.body.password, 10)
    const  hashKey = await bcrypt.hash(req.body.password + hash, 10);
    dictKey = {
        id : ++idK,
        key : hashKey,
    }

    const encrypted = CryptoJS.AES.encrypt(req.body.password, dictKey.key).toString()
    const data = {
        uri: req.body.uri,
        username: req.body.username,
        email: req.body.email,
        password: encrypted
    }

    const item = await Schema.findOneAndUpdate({_id: cookie},{

        $push: { portfolio: data  } 
    
    }).catch((error)=>{console.log(error)});
    
    res.status(200);
    res.redirect('/home')
});

const editItem = (async (req,res)=>{
    const cookie = req.cookies['cookie'];

    
    
    res.status(200);
    res.redirect('/home');
})

const signOut = ((req,res)=>{
    res.clearCookie('cookie');
    res.redirect('/');
})

module.exports = {homeGet, addItem, editItem, signOut};