'use strict';

const jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    User = require('../models/user'),
    configs = require('../configs/index');

exports.register = async (req, res) => {
    try {
        const { name, password, email, genre, address, isBarber } = req.body;

        const user = new User({ name, email, genre, address, isBarber, password: bcrypt.hashSync(password) });
        
        user.save((err, result) => {
            if (err) {
                return res.status(configs.httpStatus.internalServerError)
                    .send(configs.requestResponse(false, err, configs.responseMessages.internalServerError));
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

            const displayUser = {
                ...user,
                password: ""
            }

            return res.status(configs.httpStatus.ok).send(
                configs.authResponse(true, displayUser, configs.responseMessages.registerOk, accessToken, expiresIn)
            );
        });


    } catch(err) {
        return res.status(configs.httpStatus.internalServerError)
            .send(configs.requestResponse(false, err, configs.responseMessages.internalServerError));
    }
}

exports.login = async (req, res) => {
    try {
        const { password, email } = req.body;

        User.findOne({
            email: email
          }, (err, user) => {
            if (err || !user) {
                return res.status(!user ? configs.httpStatus.notFound : configs.httpStatus.internalServerError).send(
                    configs.requestResponse(false, err, configs.responseMessages.authFailed)
                );
            }
        
            if (!bcrypt.compareSync(String(password), user.password)) {
                return res.status(configs.httpStatus.unauthorized).send(
                    configs.requestResponse(false, null, configs.responseMessages.authFailed)
                );
            }
        
            const expiresIn = 24 * 60 * 60;

            const accessToken = jwt.sign({
              id: user._id
            }, configs.authToken.secret, {
                expiresIn: expiresIn
            });
        
            const displayUser = {
                ...user,
                password: ""
            }

            return res.status(configs.httpStatus.ok).send(
                configs.authResponse(true, displayUser, configs.responseMessages.authOk, accessToken, expiresIn)
            );

          });

    } catch(err) {
        return res.status(configs.httpStatus.internalServerError)
            .send(configs.requestResponse(false, err, configs.responseMessages.internalServerError));
    }
}