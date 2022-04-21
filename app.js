const express = require('express');
const connectDB =  require('./db/connect');
const login = require('./routes/routes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use('/', login); 

const start = async()=>{                
  try {
    await connectDB(process.env.MONGO_URI);   
    app.listen(PORT,console.log(`The server is listening on port ${PORT}`));

  } catch (error) {
    console.log({error});
  }
}

start();