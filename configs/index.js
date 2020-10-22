'use strict';

module.exports = {
    authToken: {
        secret: "whatever"
    },
    httpStatus: {
        ok: 200,
        badRequest: 400,
        notFound: 404,
        unauthorized: 401,
        methodNotAllowed: 405,
        requestTimeout: 408,
        internalServerError: 500 
    },
    routes: {
        scheduling: {
            create: "/api/scheduling/create",
            delete: "/api/scheduling/delete",
            getAll: "/api/scheduling",
            getById: "/api/scheduling/:id"
        },
        auth: {
            login: "/api/login",
            register: "/api/register"
        }
    },
    responseMessages: {
        authOk: "Usuario autenticado com sucesso",
        authFailed: "Usuario ou senha invalido",
        registerOk: "Cadastrado com sucesso!",
        internalServerError: "An internal server error has occurred, please try again later ...",
        schedulingOk: "Agendamento criado com sucesso",
        schedulingFindOk: "Agendamento encontrado com sucesso",
        schedulingNotFind: "Agendamento nao encontrado",
        schedulingListOk: "Agendamentos recuperadas com sucesso.",
        schedulingDeleteOk: "Agendamento deletado com sucesso"
    },
    requestResponse: (isValid, model, message) => ({ isValid, message, model: model }),
    authResponse: (isValid, model, message, token, expiresIn) => ({ isValid, model: model, message, token, expiresIn })
}