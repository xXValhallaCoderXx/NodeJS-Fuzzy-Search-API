const mongoose = require("mongoose");

const TodoScheme = mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
    trim: true
  }
})

const Todo =  mongoose.model('todos',TodoScheme);

module.exports = Todo;