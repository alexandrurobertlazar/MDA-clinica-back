const express = require('express');
const router = express.Router();

// Controller
const UserController = require('../controller/UserController');

// CRUD user routes
router.get('/', (req, res) => {
    const users = UserController.getAllUsers();
    res.send(users);
});

module.exports = router;