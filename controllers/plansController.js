const express = require('express');
const Plan = require('../models/plan.js');
const plans = express.Router();

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
