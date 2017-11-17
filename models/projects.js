const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const ProjectsSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    },
    projectDesc: {
        type: String,
        required: true
    },
    ids: {
        type: Array,
        required: true
    },
    description: {
        type: Array,
        required: true
    },
    time: {
        type: Array,
        required: true
    }
});

const Project = module.exports = mongoose.model('Project', ProjectsSchema);

module.exports.addProject = function(newProject, callback) {
    newProject.save(callback);
}

module.exports.getOwnersProjectList = function(owner, callback) {
    const query = {owner: owner};
    Project.find(query, callback);
}

module.exports.getAssignedProjectList = function(owner, callback) {
    const query = {members: owner};
    Project.find(query, callback);
}

module.exports.getProject = function (id, callback) {
    var objId = new ObjectId(id);
    const query = {_id: objId};
    Project.find(query, callback);
}

module.exports.getProjectCount = function (callback) {
    Project.count({}, callback);
}

module.exports.updateProject = function (project, callback) {
    var objId = new ObjectId(project['id']);

    var condition = {_id: objId}
    var options = {
        projectName: project['projectName'],
        members: project['members'],
        projectDesc: project['projectDesc'],
        ids: project['ids'],
        description: project['description'],
        time: project['time']

    };

    Project.update(condition, options, {multi: false}, callback);
}