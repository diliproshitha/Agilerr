const mongoose = require('mongoose');
const config = require('../config/database');

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