const mongoose = require('mongoose');
  
const Plan = require('../models/plan');
const Participant = require('../models/participant');

const mongoURI = 'mongodb://localhost/project-2-dev';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);

Plan.findOne({ planName: 'Mom and Pop 401k Plan' })
  .populate('participants') // <- pull in part data
  .exec((err, plan) => {
    console.log(plan);
    if (err) {
      return console.log(err);
    }
    if (plan.participants.length > 0) {
      console.log(`Plan: ${plan.planName} Participant: ${plan.participants[0].partName}`);
    } else {
      console.log(`${plan.planName} has no participants.`);
    }
    console.log(`Final. Plan ${plan}`);
  });