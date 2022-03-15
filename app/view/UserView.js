const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Controller
const UserController = require('../controller/UserController');

// CRUD user routes
router.get('/', async (req, res) => {
    const users = await UserController.getAllUsers();
    res.send(users);
});

router.post('/', async (req, res) => {
    const user = await UserController.createUser(req.body);
    if(user.error || user.validationError) {
        res.status(422);
    }
    res.send(user);
});

module.exports = router;