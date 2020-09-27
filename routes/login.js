const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('./config');

const INVALID_MSG = 'Usuario ou senha invalido';

router.post('/', (req, res) => {
  const password = req.body.senha;

  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      return res.status(500).json({
        errorMessage: INVALID_MSG,
        error: err
      });
    }

    if (!user) {
      return res.status(404).json({
        errorMessage: INVALID_MSG
      });
    }

    if (!bcrypt.compareSync(String(password), user.senha)) {
      return res.status(401).json({
        errorMessage: INVALID_MSG
      });
    }

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({
      id: user._id
    }, config.secret, {
      expiresIn: expiresIn
    });

    return res.status(201).json({
      successMessage: 'Usuario autenticado com sucesso',
      data: user,
      accessToken
    });
  });
});

module.exports = router;