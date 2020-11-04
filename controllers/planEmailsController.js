const emails = require('express').Router();
const Email = require('../models/emails');

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/sessions/new');
  }
};

// NEW
// http://localhost:3000/emails/new

emails.get('/new', (req, res) => {
    res.render('emails/new.ejs', { currentUser: req.session.currentUser });
  });

module.exports = emails;
