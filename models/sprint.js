const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const SprintSchema = mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    ids: {
        type: Array,
        required: true
    },
    userStories: {
        type: Array,
        required: true
    }
});

const Sprint = module.exports = mongoose.model('Sprint', SprintSchema);

module.exports.addSprint = function (newSprint, callback) {
    newSprint.save(callback);
}

module.exports.loadSprints = function (projectId, callback) {
    const query = {projectId: projectId};
    Sprint.find(query, callback);
}

module.exports.loadSprint = function (sprintId, callback) {
    var objId = new ObjectId(sprintId);
    const query = {_id: objId};
    Sprint.find(query, callback);
}
