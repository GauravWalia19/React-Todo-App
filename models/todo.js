const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todo = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    labels: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('todo', todo);