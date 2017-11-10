const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const socketIo = require('socket.io');



//connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', function () {
    console.log('Connected to database ' + config.database);
});

//On Error
mongoose.connection.on('error', function (err) {
    console.log('Database error ' + err);
});

//Init app
const app = express();

const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
const chat = require('./routes/chat');

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

// Chat route
app.use('/chat', chat);

//dashboard route
app.use('/dashboard', dashboard);

//set static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static(path.join(__dirname, 'styles')));
app.use('/images', express.static(path.join(__dirname, 'img')));

//main route
app.get('/', function (req, res) {
    res.send('404 NOT FOUND!');
});

// Create http server instance to use with socketio
const server = http.Server(app);
server.listen(3000, function() {
    console.log('Listening on port 3000');
});

//chat model
const Chat = require('./models/chat');

const io = socketIo(server);

io.on('connection', function(socket) {
    socket.on('sendmsg', function (data) {

        id = data.substring(0, data.indexOf(':'));
        name = data.substring(data.indexOf(':') + 1, data.indexOf(';'));
        msg = data.substring(data.indexOf(';') + 1);

        newmsg = new Chat({
            projectId: id,
            username: name,
            msg: msg
        });

        Chat.saveChat(newmsg, function (err, msg) {
            if (err) {
                console.log(err);
            }
        });
        io.sockets.emit(id, data);
    })
});

// app.listen(3000, function () {
//     console.log('Listening on port 3000');
// });