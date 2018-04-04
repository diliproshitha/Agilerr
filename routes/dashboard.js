const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Project = require('../models/projects');
const Sprint = require('../models/sprint');
const Issue = require('../models/issue');


// Add Project
router.post('/createproject', passport.authenticate('jwt', {session: false}), function(req, res) {
    newProject = new Project({
        projectName: req.body.projectName,
        owner: req.body.owner,
        members: req.body.members,
        projectDesc: req.body.projectDesc,
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
        userStories: req.body.userStories,
        backlogItem: req.body.backlogItem
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

// Edit a Sprint
router.post('/editsprint', passport.authenticate('jwt', {session: false}), function(req, res) {
    updateSprint = {};
    updateSprint['sprintId'] = req.body.sprintId;
    updateSprint['ids'] = req.body.ids;
    updateSprint['userStories'] = req.body.userStories;
    updateSprint['name'] = req.body.name;

    console.log(updateSprint);

    Sprint.updateSprint(updateSprint, function (err, sprint) {
        if (err) {
            res.json({success: false, msg: 'Failed to update sprint!'});
            console.log(err);
        } else {
            res.json({success: true, msg: 'Sprint updated successfully!'})
        }
    });
});

// Mark Sprint as Finished
router.get('/finishSprint', passport.authenticate('jwt', {session: false}), function (req, res) {
    Sprint.markAsFinish(req.query.sprintId, function (err, sprint) {
        if (err) {
            res.json({success: false, msg: 'Failed to mark as finished :('});
        } else {
            res.json({success: true, msg: 'Sprint marked as finished :)'});
        }
    });
});

//Submit a new Issue
router.post('/submitIssue', passport.authenticate('jwt', {session: false}), function (req, res) {
    newIssue = new Issue({
        issueType: req.body.type,
        priority: req.body.priority,
        description: req.body.description,
        username: req.body.username,
        projectId: req.body.projectId,
        date: req.body.date,
        fixed: 'false'

    });

    Issue.addIssue(newIssue, function (err, issue) {
        if (err) {
            console.log(err);
            res.json({success: false, msg: 'Failed to submit Issue!'});
        } else {
            res.json({success: true, msg: 'Issue Submitted Successfully!'});
        }
    });
});

// Get issues
router.get('/getIssues', passport.authenticate('jwt', {session: false}), function (req, res) {

    Issue.getIssues(req.query.projectId, function (err, issues) {
        if (err) throw err;

        if (!issues) {
            return res.json({success: false, msg: 'No Issues Found!'});
        }

        res.json({success: true, issues: issues});
    });

});

// Get issues
router.get('/getProject', passport.authenticate('jwt', {session: false}), function (req, res) {

    Project.getProject(req.query.projectId, function (err, project) {
        if (err) throw err;

        if (!project) {
            return res.json({success: false, msg: 'No Issues Found!'});
        }

        res.json({success: true, project: project});
    });

});

// Get projectCount
router.get('/getProjectCount', function (req, res) {

    Project.getProjectCount(function (err, count) {

        if (err) throw err;

        return res.json(count);
    });
});

// Add Project
router.post('/updateproject', passport.authenticate('jwt', {session: false}), function(req, res) {
    const project = {};

    project['id'] = req.body.id;
    project['members'] = req.body.members;
    project['projectName'] = req.body.projectName;
    project['members'] = req.body.members;
    project['projectDesc'] = req.body.projectDesc;
    project['ids'] = req.body.ids;
    project['description'] = req.body.description;
    project['time'] = req.body.time;

    console.log(project);

    Project.updateProject(project, function (err, project) {

        if (err) {
            res.json({success: false, msg: 'Failed to update project'});
        } else {
            res.json({success: true, msg: 'Project updated'})
        }
    })
});

// Set issues as Finished
router.get('/setIssuesAsFinished', passport.authenticate('jwt', {session: false}), function (req, res) {

    Issue.setFinished(req.query.issueId, function (err, issues) {
        if (err) throw err;

        if (!issues) {
            return res.json({success: false, msg: 'Could not change property'});
        }

        res.json({success: true, issues: issues});
    });

});

// Get an individual project
router.get('/getProject', passport.authenticate('jwt', {session: false}), function (req, res) {

    Project.getProject(req.query.projectId, function (err, project) {
        if (err) throw err;

        if (!project) {
            return res.json({success: false, msg: 'No Issues Found!'});
        }

        res.json({success: true, project: project});
    });

});


//export router
module.exports = router;