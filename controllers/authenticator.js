'use strict'
require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (secret) => {
  const token = jwt.sign(secret, process.env.SECRET_ACCESS_TOKEN);
  return { token };
} 

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err) => {
    if(err) return res.sendStatus(403);

    next();
  })
}

module.exports =  {
  authenticate,
  createToken,
}
