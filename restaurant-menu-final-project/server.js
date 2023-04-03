// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// import the routing file to handle the default (index) route
// imports the app.js file in the server/routes folder and assigns it to a variable
// named index. app.js file contains code to be executed when the default URL (/) is specified in the browser
var index = require('./server/routes/app');

// IMPORTING ROUTING FILES 
var index = require('./server/routes/app');
const mealRoutes = require('./server/routes/meals');

// establish a connection to the mongo database
mongoose.connect('mongodb://127.0.0.1:27017/restaurant-menu-app',
   { useNewUrlParser: true }, (err, res) => {
      if (err) {
         console.log('Connection failed: ' + err);
      }
      else {
         console.log('Connected to database!');
      }
   }
);

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Tell express to use the Morgan logger
app.use(logger('dev')); 

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/restaurant-menu-app')));

// Tell express to map the default route ('/') to the index route
// index is app.js file with code to be executed when the default URL (/) is specified 
// in the browser
app.use('/', index);

// CODE TO MAP URL'S TO ROUTING FILES HERE ...
app.use('/meals', mealRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/restaurant-menu-app/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
