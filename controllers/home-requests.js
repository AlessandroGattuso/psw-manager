const Schema = require('../models/item')
const bcrypt = require('bcrypt');
const { AES, enc } = require('crypto-js');

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

        if(isNaN(portfolio)){

            let i = 0;
            portfolio.forEach( (obj)=>{

                const domain = new URL(obj.uri);
                
                obj.favicon =  domain.origin + "/favicon.ico";
                obj.title = (obj.uri).replace(/.+\/\/|www.|\..+/g, '')
                obj.uri = domain.origin;
                const passphrase = dict[i++];
                const decrypted = AES.decrypt(obj.password, passphrase).toString(enc.Utf8);
                obj.password = decrypted;

            });

        }

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
    const encrypted = AES.encrypt(req.body.password, dict[idK++]).toString()
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
 
    const {id: editId, username: editUsername, email: editEmail, password: editPsw} = req.body;
    const user = await Schema.findOneAndUpdate({_id: cookie});

    let i = 0
    let returnData;
    user.portfolio.forEach(async (item)=>{

        if((item._id).toString() === (editId).toString()){
            const hash = await bcrypt.hash(editPsw, 10)
            const  hashKey = await bcrypt.hash(editPsw + hash, 10);
            dict[i] = hashKey;

            const encrypted = AES.encrypt(editPsw, dict[i]).toString()
            item.username = editUsername;
            item.email = editEmail;
            item.password = encrypted;
            await user.save();
            returnData = {editUsername, editEmail, editPsw};
            return;
        }
        i++
    })
    res.json(JSON.stringify(returnData));
    res.status(200)
})

const deleteItem = (async (req,res)=>{
    const cookie = req.cookies['cookie'];
    const item = req.body;
    
    await Schema.findOneAndUpdate(
        {_id: cookie}, 
        {$pull: {portfolio: {_id: item.idItem}}}
    ).catch((e)=>{console.log(e)})

    res.redirect(200, '/home')
});

const signOut = ((req,res)=>{
    res.clearCookie('cookie');
    res.redirect('/');
})

module.exports = {homeGet, addItem, editItem, deleteItem ,signOut};