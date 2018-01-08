const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const IssueSchema = mongoose.Schema(
    {
        issueType: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        projectId: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        fixed: {
            type: Boolean,
            required: true
        }
    }
);

const Issue = module.exports = mongoose.model('Issue', IssueSchema);

module.exports.addIssue = function (newIssue, callback) {
    newIssue.save(callback);
}

module.exports.getIssues = function (projectId, callback) {
    const query = {projectId: projectId};
    Issue.find(query, callback);
}

module.exports.setFinished = function (issueId, callback) {
    var objId = new ObjectId(issueId);

    var condition = {_id: objId}
    var options = { fixed: true };
    Issue.update(condition, {fixed: 'true'}, callback);
}