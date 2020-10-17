'use strict';

const configs = require("../configs/index");

module.exports = (app) => {
    const schedulingController = require("../controllers/schedulingController"),
        authController = require("../controllers/authController");

    //scheduling routes
    app.route(configs.routes.scheduling.create)
        .post(schedulingController.createScheduling);

    app.route(configs.routes.scheduling.delete)
        .delete(schedulingController.deleteScheduling);

    app.route(configs.routes.scheduling.getAll)
        .get(schedulingController.getAllScheduling);

    app.route(configs.routes.scheduling.getById)
        .get(schedulingController.getSchedulingById);

    //auth routes
    app.route(configs.routes.auth.login)
        .post(authController.login);
    
    app.route(configs.routes.auth.register)
        .post(authController.register);
;}