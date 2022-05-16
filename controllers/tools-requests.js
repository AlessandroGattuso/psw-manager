const path = require('path');

const tools = ((req,res)=>{
  res.sendFile(path.join(__dirname,'../views','tools.html')); 
})

module.exports = tools;