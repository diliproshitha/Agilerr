const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectId;

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