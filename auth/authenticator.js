const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
     // tokens are normally sent as the Authorization header
     const token = req.headers.authorization; 

   if (token) {
        // check if token is valid
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
          if(err) {
          // Token not valid
              res.status(401).json({ message: 'Token is bad' })
          } else {
              req.decodedToken = decodedToken;
              next();
          }
      })
  } else {
      res.status(401).json({ message: 'You shall not pass' })
  }
};



