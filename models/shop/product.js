const mongoose = require("mongoose");
const createSchema = require("../createSchema");

const productSchema = createSchema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model("product", productSchema);