const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Project = require('../models/projects');
const Sprint = require('../models/sprint')

// Add Project
router.post('/createproject', passport.authenticate('jwt', {session: false}), function(req, res) {
    newProject = new Project({
        projectName: req.body.projectName,
        owner: req.body.owner,
        members: req.body.members,
        ids: req.body.ids,
        description: req.body.description,
        time: req.body.time
    });

    Project.addProject(newProject, function (err, project) {

        if (err) {
            res.json({success: false, msg: 'Failed create new project'});
        } else {
            res.json({success: true, msg: 'Created new project'})
        }
    })
});

//Get all assigned projects for a member
router.get('/getAssignedProjects', passport.authenticate('jwt', {session: false}), function(req, res) {

    Project.getAssignedProjectList(req.query.member, function(err, projects) {

        if (err) throw err;

        if (!projects) {
            return res.json({success: false, msg: 'No Projects Found!'});
        }

        res.json(projects);


    });
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

// Create new Sprint
router.post('/createsprint', passport.authenticate('jwt', {session: false}), function(req, res) {
    newSprint = new Sprint({
        projectId: req.body.projectId,
        name: req.body.name,
        date: req.body.date,
        ids: req.body.ids,
        userStories: req.body.userStories
    });

    Sprint.addSprint(newSprint, function (err, sprint) {
        if (err) {
            res.json({success: false, msg: 'Failed create new sprint'});
            console.log(err);
        } else {
            res.json({success: true, msg: 'Created new sprint'})
        }
    });
});

// Get Sprints
router.get('/getsprints', passport.authenticate('jwt', {session: false}), function(req, res) {

    Sprint.loadSprints(req.query.projectId, function(err, projects) {

        if (err) throw err;

        if (!projects) {
            return res.json({success: false, msg: 'No Projects Found!'});
        }

        res.json(projects);


    });

});

// Get Sprint
router.get('/getsprint', passport.authenticate('jwt', {session: false}), function(req, res) {

    Sprint.loadSprint(req.query.sprintId, function(err, sprint) {

        if (err) throw err;

        if (!sprint) {
            return res.json({success: false, msg: 'No Projects Found!'});
        }

        res.json(sprint);

    });

});


//export router
module.exports = router;