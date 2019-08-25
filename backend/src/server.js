const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-b8lc6.mongodb.net/rocketseat8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

const server = express();
const routes = require('./routes.js');

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);