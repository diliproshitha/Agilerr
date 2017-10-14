const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Project = require('../models/projects');

// Add Project
router.post('/createproject', passport.authenticate('jwt', {session: false}), function(req, res) {
    newProject = new Project({
        projectName: req.body.projectName,
        owner: req.body.owner,
        members: req.body.members
    });

    Project.addProject(newProject, function (err, project) {

        if (err) {
            res.json({success: false, msg: 'Failed create new project'});
        } else {
            res.json({success: true, msg: 'Created new project'})
        }
    })
});

//Get all assigned projects
router.get('/getAssignedProjects', passport.authenticate('jwt', {session: false}), function(req, res) {

});


// Get Projects of a owner
router.get('/getProjectsOfOwner', passport.authenticate('jwt', {session: false}), function(req, res) {

    Project.getOwnersProjectList(req.query.owner, function(err, projects) {

        if (err) throw err;

        if (!projects) {
            return res.json({success: false, msg: 'No Projects Found!'});
        }

        res.json(projects);


    });

});

//export router
module.exports = router;