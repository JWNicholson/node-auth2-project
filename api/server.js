const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//authRouter

//usersRouter

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//server.use authRouter

//server.use usersRouter

server.get('/', (req,res) => {
    res.send("Node-auth2 Project");
});

module.exports = server;