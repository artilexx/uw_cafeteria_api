const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    date: {
        required: true,
        type: String /* yy-mm-dd */
    },
    items: {
        required: true,
        type: Array
    },
    station: {
        required: true,
        type: String        
    }
})

module.exports = mongoose.model("menus", dataSchema, "menus")
