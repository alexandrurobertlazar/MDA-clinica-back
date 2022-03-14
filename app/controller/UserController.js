// Model
const User = require('../model/User');

function getAllUsers() {
    var userMap = {};
    User.find({}, (err, users) => {
        users.forEach(user => {
            userMap[user._id] = user;
        });
    });
    return userMap;
}

module.exports = { getAllUsers };