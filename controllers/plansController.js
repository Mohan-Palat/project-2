const express = require('express');
const Plan = require('../models/plan.js');
const plans = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/sessions/new');
  }
};

// NEW

plans.get('/new', (req, res) => {
    res.render('plans/new.ejs', { currentUser: req.session.currentUser });
  });
  
// EDIT

plans.get('/:id/edit', (req, res) => {
  Plan.findById(req.params.id, (error, foundPlan) => {
    res.render('plans/edit.ejs', {
      plan: foundPlan,
      currentUser: req.session.currentUser,
    });
  });
});

// DELETE

plans.delete('/:id', (req, res) => {
  Plan.findByIdAndRemove(req.params.id, (err, deletedPlan) => {
    res.redirect('/plans');
  });
});

// SHOW

plans.get('/:id', isAuthenticated, (req, res) => {
  Plan.findById(req.params.id, (error, foundPlan) => {
    res.render('plans/show.ejs', {
      plan: foundPlan,
      currentUser: req.session.currentUser,
    });
  });
});

// UPDATE

plans.put('/:id', (req, res) => {
  if (req.body.planIsInstitutional === 'on') {
    req.body.planIsInstitutional = true;
  } else {
    req.body.planIsInstitutional = false;
  }
  Plan.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedModel) => {
      res.redirect('/plans');
    }
  );
});

// CREATE

plans.post('/', isAuthenticated, (req, res) => {
    if (req.body.planIsInstitutional === 'on') {
      req.body.planIsInstitutional = true;
    } else {
      req.body.planIsInstitutional = false;
    }
    Plan.create(req.body, (error, createdPlan) => {
      res.redirect('/plans');
    });
  });

// INDEX

plans.get('/', (req, res) => {
  Plan.find({}, (error, allPlans) => {
      console.log(allPlans)
    res.render('plans/index.ejs', {
      plans: allPlans,
      currentUser: req.session.currentUser,
    });
  });
});

module.exports = plans;
