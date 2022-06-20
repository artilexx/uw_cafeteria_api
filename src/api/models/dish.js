const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    dish: {
        required: true,
        type: String    
    }
})

module.exports = mongoose.model("dishes", dataSchema, "dishes")
