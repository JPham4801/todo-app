const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Connect to MongoDB using the connection string in .env file
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// Import the Todo model
const Todo = require('./models/todo.js');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res, next) => {
  res.render('index.ejs');
});

app.get('/todos', async (req, res, next) => {
  const allTodos = await Todo.find();
  res.render('todos/index.ejs', { todos: allTodos });
});

app.get('/todos/new', async (req, res, next) => {
  res.render('todos/new.ejs');
});

app.get('/todos/:todoId', async (req, res, next) => {
  const foundTodo = await Todo.findById(req.params.todoId);
  res.render('todos/show.ejs', { todo: foundTodo });
});

app.get('/todos/:todoId/edit', async (req, res, next) => {
  const foundTodo = await Todo.findById(req.params.todoId);
  res.render('todos/edit.ejs', { todo: foundTodo });
});

app.post('/todos', async (req, res, next) => {
  req.body.isComplete = false;

  await Todo.create(req.body);
  res.redirect('/todos');
});

app.put('/todos/:todoId', async (req, res, next) =>{
  await Todo.findByIdAndUpdate(req.params.todoId, req.body);
  res.redirect(`/todos/${req.params.todoId}`);
})

app.delete('/todos/:todoId', async (req, res, next) =>{
  await Todo.findByIdAndDelete(req.params.todoId);
  res.redirect(`/todos`);
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
