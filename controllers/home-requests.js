const path = require('path');

const homeGet = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','home.html')); 
})


module.exports = homeGet;