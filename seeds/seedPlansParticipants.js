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

(async function () {
  //await mongoose.connection.dropCollection('plans');
  //await mongoose.connection.dropCollection('participants');
  
  // CREATE TWO PARTICIPANTS
  
  const gates = await Participant.create({
    partName: 'Bill Gates',
    partSsn: '123-45-6789',
    partIsHce: true, // Higly Compensated Employee :D
    partIsActive: true,
  });

  const palat = await Participant.create({
    partName: 'Mohan Palat',
    partSsn: '987-65-4321',
    partIsHce: false, 
    partIsActive: true,
  });

  // CREATE TWO PLANS

  const aesp = new Plan({
    planName: 'ACME Employee Savings Plan',
    planIsInstitutional: true,
    participants: [],
  });

  const map401k = new Plan({
    planName: 'Mom and Pop 401k Plan',
    planIsInstitutional: false,
    participants: [],
  });

  // PUSH THE PARTICIPANTS ONTO THE PLAN'S
  // PARTICIPANTS ARRAY (ASSOCIATE!)

  aesp.participants.push(gates);
  map401k.participants.push(palat); 
  aesp.save(function (err, plan) {
    if (err) {
      console.log(err);
    } else {
      console.log('first plan is ', plan);
    }
  });
  map401k.save(function (err, plan) {
    if (err) {
      console.log(err);
    } else {
      console.log('second plan is ', plan);
    }
  });
})();
