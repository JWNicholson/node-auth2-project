const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/authenticator');

//get users
router.get('/', restricted, findDepartment('sales'), (req,res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
            .catch(err => res.send(err));
});

function findDepartment(department){
    return function(req,res,next){
        if(
            req.user &&
            req.user.department &&
            req.user.department.toLowerCase() === department
        ){
            next();
        }else{
            res.status(403).json({ message: "Could not find that info."})
        }
    }
}

module.exports = router;