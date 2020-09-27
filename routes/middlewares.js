const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token invalido'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401)
      .json({
        errorMessage: 'Usuario nao autenticado para esta operacao'
      });
  }
};

module.exports = {
  checkToken
}