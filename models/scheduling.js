const mongoose = require("mongoose");
const createSchema = require("./createSchema");

const schedulingSchema = createSchema({
    barber: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model("scheduling", schedulingSchema);