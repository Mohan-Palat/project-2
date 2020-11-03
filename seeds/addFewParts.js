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
  
  const chan = await Participant.create({
    partName: 'Jackie Chan',
    partSsn: '123-88-6789',
    partIsHce: false, // Not Higly Compensated Employee :D
    partIsActive: true,
  });

  const khan = await Participant.create({
    partName: 'Sharukh Khan',
    partSsn: '988-65-4321',
    partIsHce: true, 
    partIsActive: true,
  });

  // GET PLAN HANDLE

  const map401k = Plan.findById('5f9c44f7a0cfc91cb36969f3')
    
  // PUSH THE PARTICIPANTS ONTO THE PLAN'S
  // PARTICIPANTS ARRAY (ASSOCIATE!)

  map401k.participants.push(chan); 
  map401k.participants.push(khan); 
  map401k.save(function (err, plan) {
    if (err) {
      console.log(err);
    } else {
      console.log('second plan is ', plan);
    }
  });
})();
