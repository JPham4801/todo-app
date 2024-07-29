const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res, next) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send('username is already taken');
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and confirm do not match');
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
  req.body.password = hashedPassword;
  
  const user = await User.create(req.body);
  res.redirect('/');
});

router.get('/sign-in', (req, res, next) => {
  res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res, next) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send('Login failed');
  }
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send('Login failed, Please try again');
  }
  req.session.user = {
    username: userInDatabase.username,
  };
  res.redirect('/');
});

router.get('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
