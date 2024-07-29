const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: String,
  isComplete: {
    type: Boolean,
    default: false,
  },
}); 

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [todoSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;