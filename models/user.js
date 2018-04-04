const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (error, isMatch) {
        if (error) throw error;

        callback(null, isMatch);
    });
}

module.exports.getEmail = function (email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.getSuggestions = function (string, callback) {
    const query = {username: {$regex : '.*' + string + '.*'}};
    User.find(query, {name: 1, username: 1,type: 1}, callback);
}

module.exports.getUsersCount = function (callback) {
    User.count({}, callback);
}