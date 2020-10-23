'use strict';

const configs = require("../configs/index"),
    express = require("express"),
    router = express.Router();

module.exports = (app) => {
    const schedulingController = require("../controllers/barber/schedulingController"),
        authController = require("../controllers/common/authController");

    //scheduling routes
    router.post(configs.routes.scheduling.create, schedulingController.createScheduling);

    app.route(configs.routes.scheduling.delete)
        .delete(schedulingController.deleteScheduling);

    app.route(configs.routes.scheduling.getAll)
        .get(schedulingController.getAllScheduling);

    app.route(configs.routes.scheduling.getById)
        .get(schedulingController.getSchedulingById);

    //auth routes
    app.route(configs.routes.auth.login)
        .post(authController.login);

    app.route(configs.routes.auth.register).post(authController.register)
;}