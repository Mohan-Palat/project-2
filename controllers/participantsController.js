const participants = require('express').Router();
const Participant = require('../models/participant');

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/sessions/new');
  }
};

// NEW

participants.get('/new', (req, res) => {
    res.render('participants/new.ejs', { currentUser: req.session.currentUser });
  });
  
// CREATE

participants.post('/', isAuthenticated, (req, res) => {
    if (req.body.partIsHce === 'on') {
        req.body.partIsHce = true;
      } else {
        req.body.partIsHce = false;
      }
      if (req.body.partIsActive === 'on') {
        req.body.partIsActive = true;
      } else {
        req.body.partIsActive = false;
      }
    Participant.create(req.body, (error, createdParticipant) => {
      res.redirect('/participants');
    });
  });

// INDEX

participants.get('/', (req, res) => {
    Participant.find({}, (error, allParticipants) => {
        console.log(allParticipants)
      res.render('participants/index.ejs', {
        participants: allParticipants,
        currentUser: req.session.currentUser,
      });
    });
  });

module.exports = participants;
