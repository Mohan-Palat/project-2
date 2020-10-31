const express = require('express');
const Plan = require('../models/plan.js');
const plans = express.Router();

// NEW

plans.get('/new', (req, res) => {
    res.render('plans/new.ejs');
  });
  
// EDIT

plans.get('/:id/edit', (req, res) => {
  Plan.findById(req.params.id, (error, foundPlan) => {
    res.render('plans/edit.ejs', {
      plan: foundPlan,
    });
  });
});

// SHOW

plans.get('/:id', (req, res) => {
  Plan.findById(req.params.id, (error, foundPlan) => {
    res.render('plans/show.ejs', {
      plan: foundPlan,
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

plans.post('/', (req, res) => {
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
      plans: allPlans
    });
  });
});

module.exports = plans;
