const path = require('path');
const Schema = require('../models/item')
const crypt = require('crypto');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

let dictKey = {};
let idK = -1;

function domain_from_url(url) {
    let result
    let match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
}

const homeGet = (async (req,res)=>{
    const cookie = req.cookies['cookie'];
    if(cookie === undefined){
        res.send('Before you have to login');
    }else{

        const item = await Schema.findOne({_id : cookie});
        const portfolio = item.portfolio;
        const pttrn = /^(https?:\/\/)?(www\.)?([^\/]+)/gm;

        portfolio.forEach(function(obj){
            const domain = new URL(obj.uri);
            obj.favicon =  domain.origin + "/favicon.ico";
            obj.title = (obj.uri).replace(/.+\/\/|www.|\..+/g, '')
            obj.uri = domain.origin;
        });

        res.render('home', { data: portfolio });
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
    res.redirect('/')
});

const signOut = ((req,res)=>{
    res.clearCookie('cookie');
    res.redirect('/');
})

module.exports = {homeGet, addItem, signOut};