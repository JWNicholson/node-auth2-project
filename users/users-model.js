const db = require('../database/dbConfig');

module.exports = {
    addUser,
    getUsers,
    findBy,
    findById
};

function addUser(user){
    return db('users')
    .insert(user)
}

function getUsers(){
    return db('users')
}

function findBy(username){
    return db('users')
     .where({ username })
 }

function findById(id){
    return db('users')
    .where({id})
}





