const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: String,
  isComplete: Boolean
}); 

module.exports = mongoose.model('Todo', todoSchema);
