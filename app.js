const express = require('express');
const login = require('./routes/routes');
const path = require('path');
require('dotenv');

const app = express();
const PORT = 3000;

app.use('/', express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use('/login', login);

app.listen(PORT, console.log(`The server is listening on port ${PORT}`));