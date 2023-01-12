const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    company: String,
    email: {
        type: String,
        unique: true
    },
    contact: Number
});

const Contactdb = mongoose.model('contactdb', schema);

module.exports = Contactdb;