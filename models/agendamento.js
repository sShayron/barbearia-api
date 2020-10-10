const mongoose = require("mongoose");
const createSchema = require("./createSchema");

const agendamentoSchema = createSchema({
    barbeiro: {
        type: String,
        required: true,
    },
    servico: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model("agendamento", agendamentoSchema);