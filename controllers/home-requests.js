const path = require('path');
const Schema = require('../models/item')
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

let dict = {};
let idK = 0;

const homeGet = (async (req,res)=>{
    const cookie = req.cookies['cookie'];
    if(cookie === undefined){
        res.send('Before you have to login');
    }
    else{
        const item = await Schema.findOne({_id : cookie});
        const portfolio = item.portfolio;

        if(!isNaN(portfolio)){
            res.status(200)
            return;
        }

        let i = 0;
        portfolio.forEach( (obj)=>{

            const domain = new URL(obj.uri);
            
            obj.favicon =  domain.origin + "/favicon.ico";
            obj.title = (obj.uri).replace(/.+\/\/|www.|\..+/g, '')
            obj.uri = domain.origin;
            const passphrase = dict[i++];
            const decrypted = CryptoJS.AES.decrypt(obj.password, passphrase);
            console.log( dict + " " + passphrase + " " + decrypted) 
            obj.password = decrypted;

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
    dict[idK] = hashKey;
    const encrypted = CryptoJS.AES.encrypt(req.body.password, dict[idK++]).toString()
    console.log(encrypted + "\n" + dict)
    const data = {
        uri: req.body.uri,
        username: req.body.username,
        email: req.body.email,
        password: encrypted
    }

    await Schema.findOneAndUpdate({_id: cookie},{

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