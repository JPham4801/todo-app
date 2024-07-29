const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const todosController = require('./controllers/todos.js');

const app = express();

// Connect to MongoDB using the connection string in .env file
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// Import the User model
const User = require('./models/user.js');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Routes accessible to everyone
app.use(passUserToView);

app.get('/', (req, res, next) => {
  if (req.session.user) {
    // console.log(req.session.user)
    res.redirect(`/users/${req.session.user._id}/todos`);
  } else {
    res.render('index.ejs');
  }
});

app.use('/auth', authController);

// Routes accessible to User only
app.use(isSignedIn);
app.use('/users/:userId/todos', todosController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

