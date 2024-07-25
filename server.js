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

const PORT = process.env.PORT ? process.env.PORT : '3000';

// Import the Todo model
const Todo = require('./models/todo.js');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

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

app.post('/todos', async (req, res, next) => {
  try {
    await Todo.create(req.body);
    res.redirect('/todos');
  } catch (error) {
    console.log(error)
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});