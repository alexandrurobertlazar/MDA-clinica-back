const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Controller
const UserController = require('../controller/UserController');

// Get all users
router.get('/', async (req, res) => {
    const users = await UserController.getAllUsers();
    res.send(users);
});

// Get user by id
router.get('/:userId', async (req, res) => {
    const user = await UserController.getUserById(req.params.userId);
    if(!user) {
        res.status(404);
        res.send({"error": "No se ha podido encontrar al usuario"})
    }
    res.send(user);
});

// Create user
router.post('/', async (req, res) => {
    const user = await UserController.createUser(req.body);
    if(user.error || user.validationError) {
        res.status(422);
    }
    res.send(user);
});

module.exports = router;