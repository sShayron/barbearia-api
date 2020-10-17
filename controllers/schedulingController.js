'use strict';

const configs = require("../configs/index"),
    Scheduling = require("../models/scheduling");

exports.createScheduling = async (req, res) => {
    try {
        const { barber, service, date, price } = req.body;
        
        const scheduling = new Scheduling({ barber, service, date, price });

        scheduling.save((err, result) => {
            if (err) {
                return res.status(configs.httpStatus.internalServerError).send(
                    configs.requestResponse(false, err, configs.responseMessages.internalServerError)
                );
            }
    
            return res.status(configs.httpStatus.ok)
                .send(configs.requestResponse(
                    true, result, configs.responseMessages.schedulingOk
                ));
        });

    } catch(err) {
        return res.status(configs.httpStatus.internalServerError)
            .send(configs.requestResponse(false, err, configs.responseMessages.internalServerError));
    }
}

exports.getSchedulingById = async (req, res) => {
    try {
        const { id } = req.params;

        Scheduling.findById(id, (err, result) => {
            if (err) {
                return res.status(configs.httpStatus.internalServerError).send(
                    configs.requestResponse(false, err, configs.responseMessages.internalServerError)
                );
            }
            if (!result) {
                return res.status(configs.httpStatus.notFound).send(
                    configs.requestResponse(false, id, configs.responseMessages.schedulingNotFind)
                );
            }

            return res.status(configs.httpStatus.ok).send(
                configs.responseMessages(true, result, configs.responseMessages.schedulingFindOk)
            );
        })

    } catch(err) {
        return res.status(configs.httpStatus.internalServerError)
            .send(configs.requestResponse(false, err, configs.responseMessages.internalServerError));
    }
}

exports.getAllScheduling = async (req, res) => {
    try {
        Scheduling.find()
            .exec((err, result) => {
                if (err) {
                    return res.status(configs.httpStatus.internalServerError).send(
                        configs.requestResponse(false, err, configs.responseMessages.internalServerError)
                    );
                }

                return res.status(configs.httpStatus.ok).send(
                    configs.requestResponse(true, result, configs.responseMessages.schedulingListOk)
                );
            });
    } catch(err) {
        return res.status(configs.httpStatus.internalServerError)
            .send(configs.requestResponse(false, err, configs.responseMessages.internalServerError));
    }
}

exports.deleteScheduling = async (req, res) => {
    try {
        const { id } = req.params;

        Scheduling.findById(id, (err, result) => {
            if (err) {
                return res.status(configs.httpStatus.internalServerError).send(
                    configs.requestResponse(false, err, configs.responseMessages.internalServerError)
                );
            }
            if (!result) {
                return res.status(configs.httpStatus.notFound).send(
                    configs.requestResponse(false, result, configs.responseMessages.schedulingNotFind)
                );
            }
    
            result.remove((err, result) => {
                if (err) {
                    return res.status(configs.httpStatus.internalServerError).send(
                        configs.requestResponse(false, err, configs.responseMessages.internalServerError)
                    );
                }

                return res.status(httpStatus.ok).send(
                    configs.requestResponse(true, result, configs.responseMessages.schedulingDeleteOk)
                );
            });
        });

    } catch (err) {
        return res.status(configs.httpStatus.internalServerError)
            .send(configs.requestResponse(false, err, configs.responseMessages.internalServerError));
    }
}