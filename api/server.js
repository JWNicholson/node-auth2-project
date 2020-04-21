const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//authRouter
const authRouter = require('../auth/auth-router');

//usersRouter
const usersRouter = require('../users/users-router');

const authenticator = require('../auth/authenticator');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('./api/users', authenticator, usersRouter);

server.get('/', (req,res) => {
    res.send("Node-auth2 Project");
});

module.exports = server;