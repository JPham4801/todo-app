const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index
router.get('/', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('todos/index.ejs', {
      todos: currentUser.todos,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Create
router.get('/new', (req, res, next) => {
  res.render('todos/new.ejs');
});

router.post('/', async (req, res, next) => {
  const currentUser = await User.findById(req.session.user._id);
  currentUser.todos.push(req.body);
  await currentUser.save();

  res.redirect(`/users/${currentUser._id}/todos`);
});

// Update
router.get('/:todoId', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const todo = currentUser.todos.id(req.params.todoId);
    res.render('todos/show.ejs', {
      todo: todo,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:todoId/edit', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const todo = currentUser.todos.id(req.params.todoId);

    res.render('todos/edit.ejs', {
      todo: todo,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:todoId', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const todo = currentUser.todos.id(req.params.todoId);

    todo.set(req.body);
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/todos/${req.params.todoId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:todoId', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.todos.id(req.params.todoId).deleteOne();
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/todos`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
