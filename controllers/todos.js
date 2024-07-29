const express = require('express');
const router = express.Router()

const User = require('../models/user.js');

// Index
router.get('/', async (req, res, next) =>{
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('todos/index.ejs', {
      todos: currentUser.todos
    });
  } catch (error) {
    console.log(error)
    res.redirect('/');
  }
})

// Create
router.get('/new', (req, res, next) => {
  res.render('todos/new.ejs');
});

router.post('/', async (req, res, next) => {
  const currentUser = await User.findById(req.session.user._id);
  currentUser.todos.push(req.body)
  await currentUser.save()

  res.redirect(`/users/${currentUser._id}/todos`);
});

module.exports = router


// GRAVEYARD -------------------------------------------------------------------

// router.get('/:todoId', async (req, res, next) => {
  // const foundTodo = await Todo.findById(req.params.todoId);
  // res.render('todos/show.ejs', { todo: foundTodo });
// });

// router.get('/:todoId/edit', async (req, res, next) => {
  // const foundTodo = await Todo.findById(req.params.todoId);
  // res.render('todos/edit.ejs', { todo: foundTodo });
// });

// router.put('/:todoId', async (req, res, next) => {
  // await Todo.findByIdAndUpdate(req.params.todoId, req.body);
  // res.redirect(`/todos/${req.params.todoId}`);
// });

// router.delete('/:todoId', async (req, res, next) => {
  // await Todo.findByIdAndDelete(req.params.todoId);
  // res.redirect(`/todos`);
// });