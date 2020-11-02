// http://localhost:3000/
//___________________
//Dependencies
//___________________
require('dotenv').config();
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session');

// CONFIGURATION

const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
// const theProject = 'mohan-project-2'
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + theProject;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/project-2-dev';

// Connect to Mongo
mongoose.connect(
  MONGODB_URI ,  
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established at', MONGODB_URI);
  }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});
//___________________
//Middleware
//___________________
app.use(
  session({
    // secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    secret: 'FeedMeSeymour',
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.set('view engine', 'ejs');

//___________________
// Routes Testing
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

// CONTROLLERS

const plansController = require('./controllers/plansController.js');
app.use('/plans', plansController);
const userController = require('./controllers/users_controller.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);
const participantsController = require('./controllers/participantsController.js');
app.use('/participants', participantsController);

// ROUTES

app.get('/', (req, res) => {
  res.redirect('/plans');
});

app.get('/any', (req, res) => {
  //any route will work
  req.session.anyProperty = 'any value';
  console.log(req.session);
  res.send('session was added');
});

app.get('/retrieve', (req, res) => {
  //any route will work
  console.log(req.session);
  if (req.session.anyProperty === 'something you want it to') {
    //test to see if that value exists
    //do something if it's a match
    console.log('it matches! cool');
  } else {
    //do something else if it's not
    console.log('nope, not a match');
  }
  res.redirect('/');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));