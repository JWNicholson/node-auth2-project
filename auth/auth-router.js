//const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const{ jwtSecret } = require("../config/secrets");

const User = require('../users/users-model');

router.get('/', (req,res)=> {
    res.status(200).json({message: "api is working"});
});

// api/auth endpoints
router.post('/register', (req,res)=>{
    const user = req.body;

    //const rounds = process.env.HASH_ROUNDS || 10;

    const hash = bcrypt.hashSync(user.password,10);

    user.password = hash;
    
    User.addUser(user)
    .then(user => {
        if(user){
            User.findById(user[0])
            .then(([user])=>{
                res.status(200).json(user)
            }).catch(err => {
                res.status(500).json({message: "Could not create account."})
            })
        }else{
            res.status(400).json({message: "Could not create account."})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Could not create account."})
    })
});


    router.post('/login', (req,res)=>{
        const { username , password } = req.body;
        User.findBy(username)
        .then(([user]) => {
            if(user && bcrypt.compareSync(password ,user.password)){
                const token = generateToken(user);
                res.status(200).json({message: "You are signed in.", token})
            }else{
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Cant retrieve that right now.' })
        })
    });

  
    function generateToken(user){
        const payload = {
            userid: user.id, 
            username: user.username, 
            department: user.department
        };
        const options = {
            expiresIn: '1d'
        };
        return jwt.sign(payload, jwtSecret, options)
    };


module.exports = router;