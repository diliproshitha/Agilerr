const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Chat = require('../models/chat');

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res){
    Chat.getChat(req.query.projectId, function (err, msgs) {
        if (err) throw err;

        if (!msgs) {
            return res.json({success: false, msg: 'Whoa... Its Fresh!!'});
        }

        res.json(msgs);
    });
});

module.exports = router;