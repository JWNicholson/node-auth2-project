const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const{ jwtSecret } = require("../config/secrets");

const Users = require('../users/users-model');

// api/auth endpoints
router.post('/register', (req,res) => {
    let user = req.body;

    const rounds = process.env.HASH_ROUNDS || 10;

    const hash = bcrypt.hashSync(user.password,rounds);

    user.password = hash;

    Users.add(user)
        .then(saved => {
        console.log("/register saved: ",saved);
        res.status(201).json(saved);
    })
        .catch(error => {
            res.status(500).json(error);
        });


module.exports = router;