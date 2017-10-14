const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', function () {
    console.log('Connected to database ' + config.database);
});

//On Error
mongoose.connection.on('error', function (err) {
    console.log('Databse error ' + err);
});

//Init app
const app = express();

const users = require('./routes/users');
const dashboard = require('./routes/dashboard');

//Cors middleware
app.use(cors());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Body Parser Middleware
app.use(bodyParser.json());

//users route
app.use('/users', users);

//dashboard route
app.use('/dashboard', dashboard);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('stylesheets', express.static(path.join(__dirname, 'styles')));
app.use('images', express.static(path.join(__dirname, 'img')));

app.get('/', function (req, res) {
    res.send('INDEX');
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});