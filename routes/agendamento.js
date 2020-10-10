const express = require("express");
const router = express.Router();
const Agendamento = require("../models/agendamento");

router.post("/", (req, res) => {
    const newAgendamento = new Agendamento({
        barbeiro: req.body.barbeiro,
        servico: req.body.servico,
        data: req.body.data,
        valor: req.body.valor
    });

    newAgendamento.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                errorMessage: "Erro no servidor",
                error: err,
            });
        }

        return res.status(201).json({
            successMessage: "Agendamento criado com sucesso",
            data: result
        });
    });
});


router.get('/:id', function (_, res) {
    Agendamento.findById(req.params.id, function(err, result) {
        if (err) {
            return res.status(500).json({
                errorMessage: 'Erro ao localizar agendamento',
                error: err
            });
        }
        if (!result) {
            return res.status(404).json({
                errorMessage: 'Agendamento nao encontrado'
            });
        }

        return res.status(200).json({
            successMessage: 'Agendamento encontrado com sucesso',
            data: result
        })
    })
});

router.get('/', function (_, res) {
    Agendamento.find()
        .exec(function (err, result) {
            if (err) {
                return res.status(500).json({
                    errorMessage: 'Erro ao recuperar.',
                    error: err
                });
            }

            return res.status(200).json({
                successMessage: 'Agendamentos recuperadas com sucesso.',
                data: result
            });
        });
});



router.delete('/:id', function (req, res) {
    Agendamento.findById(req.params.id, function (err, result) {
        if (err) {
            return res.status(500).json({
                errorMessage: 'Erro ao localizar agendamento',
                error: err
            });
        }
        if (!result) {
            return res.status(404).json({
                errorMessage: 'Agendamento nao encontrado'
            });
        }

        result.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    errorMessage: 'Erro ao deletar agendamento',
                    error: err
                });
            }
            return res.status(200).json({
                successMessage: 'Agendamento deletada com sucesso',
                data: result
            })
        });
    });
})

module.exports = router;
