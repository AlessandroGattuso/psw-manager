const express = require('express');
const connectDB =  require('./db/connect');
const cookieParser = require('cookie-parser');
const route = require('./routes/routes');
const path = require('path');
require('dotenv').config();
const cors = require('cors')

const app = express();
const PORT = 3000;

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use('/', route);

const start = async()=>{                
  try {
    await connectDB(process.env.MONGO_URI);   
    app.listen(PORT,console.log(`The server is listening on port ${PORT}`));

  } catch (error) {
    console.log({error});
  }
}

start();