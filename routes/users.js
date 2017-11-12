const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const multer = require('multer');
// const upload = multer({dest: 'img/profile'});

var storage = multer.diskStorage({
    destination: 'img/profile',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

const User = require('../models/user');

//Register
router.post('/register', function (req, res) {
    newuser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    });

    User.addUser(newuser, function (err, user) {
        if (err){
            res.json({success: false, msg: JSON.stringify(err)});
        } else {
            res.json({success: true, msg: 'User Registered'});
        }
    });
});

//Authenticate
router.post('/authenticate', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function (err, user) {
       if (err) throw err;

       if (!user){
           return res.json({sucess: false, msg: 'User not found'});
       }

       User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            const token = jwt.sign({data: user}, config.secret, {
                expiresIn: 604800 // 1 week
            });

            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    type: user.type
                }
            });
          } else {
              res.json({success: false, msg: 'Wrong password'});
          }
       });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({user: req.user});
});

//Validate
router.get('/validate', function (req, res) {
    res.send('VALIDATE');
});

//Get User or check user
router.get('/checkuser', function (req, res) {
    const username = req.query.username;

    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.json({success: false});
        } else {
            return res.json({success: true});
        }
    });
});

//Check email available or not
router.get('/checkemail', function (req, res) {
    const email = req.query.email;

    User.getEmail(email, function (err, email) {
        if (err) throw err;

        if (!email) {
            return res.json({success: false});
        } else {
            return res.json({success: true});
        }
    });
});

//Upload profile image
router.post('/uploadProfileImage', upload.single('profile'), function (req, res, next) {
    if (!req.file) {
        console.log('No file found!');
        return res.json({success: false});
    } else {



        console.log('File received : '+ req.body.filename);
        return res.json({success: true});
    }
    
});

// User Suggestions
router.get('/suggestions', passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.query.suggest) {

        User.getSuggestions(req.query.suggest, function (err, users) {
            if (err) throw err;

            if (!users) {
                return res.json({success: false});
            }

            return res.json({success: true, users: users});
        })
    }
});

//export
module.exports = router;