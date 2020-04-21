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
});

router.post("/login", (req,res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);

                res.status(200).json({ token });
            }else{
                res.status(401).json({ message: "Invalid Credentials"});
            }
        })
            .catch(error => {
                res.status(500).json(error);
            });
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;