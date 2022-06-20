const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    station: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("stations", dataSchema, "stations")