const mongoose = require('mongoose');


const ChatSchema = mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
});

const Chat = module.exports = mongoose.model('Chat', ChatSchema);

module.exports.saveChat = function (newMsg, callback) {
    newMsg.save(callback);
}

module.exports.getChat = function (id, callback) {
    const query = {projectId: id};
    Chat.find(query, callback);
}