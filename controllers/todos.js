const express = require('express');
const router = express.Router()

const User = require('../models/user.js');

router.get('/', (req, res, next) =>{
  try {
    res.render('todos/index.ejs');
  } catch (error) {
    console.log(error)
    res.redirect('/');
  }
})


module.exports = router


// GRAVEYARD -------------------------------------------------------------------

// router.get('/new', async (req, res, next) => {
//   // res.render('todos/new.ejs');
// });

// router.get('/:todoId', async (req, res, next) => {
//   // const foundTodo = await Todo.findById(req.params.todoId);
//   // res.render('todos/show.ejs', { todo: foundTodo });
// });

// router.get('/:todoId/edit', async (req, res, next) => {
//   // const foundTodo = await Todo.findById(req.params.todoId);
//   // res.render('todos/edit.ejs', { todo: foundTodo });
// });

// router.post('', async (req, res, next) => {
//   // req.body.isComplete = false;
//   // await Todo.create(req.body);
//   // res.redirect('/todos');
// });

// router.put('/:todoId', async (req, res, next) => {
//   // await Todo.findByIdAndUpdate(req.params.todoId, req.body);
//   // res.redirect(`/todos/${req.params.todoId}`);
// });

// router.delete('/:todoId', async (req, res, next) => {
//   // await Todo.findByIdAndDelete(req.params.todoId);
//   // res.redirect(`/todos`);
// });