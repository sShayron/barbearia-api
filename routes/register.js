const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("./config");
const User = require("../models/user");

router.post("/", (req, res) => {
  const newUser = new User({
    nome: req.body.nome,
    email: req.body.email,
    genero: req.body.genero,
    senha: bcrypt.hashSync(req.body.senha),
    endereco: req.body.endreco,
  });

  newUser.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        errorMessage: "Erro no servidor",
        error: err,
      });
    }

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign(
      {
        id: result._id,
      },
      config.secret,
      {
        expiresIn: expiresIn,
      }
    );

    return res.status(201).json({
      successMessage: "Usuario criado com sucesso",
      data: result,
      accessToken,
    });
  });
});

module.exports = router;
