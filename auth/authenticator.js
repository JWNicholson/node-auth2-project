const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
     // tokens are normally sent as the Authorization header
   const token = req.headers.authorization;

   if (token) {
        // check if token is valid
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
          // if token is valid the error will be undefined
          if (error) {
            res.status(401).json({ message: "You shall not pass" });
          } else {
              //token valid
            req.decodedToken = decodedToken;
            
            next();
          }
        });
      } else {
        res.status(400).json({ message: "Provide your credentials." });
      }
};