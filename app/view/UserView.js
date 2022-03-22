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
    } else {
        res.send(user);
    }
});

// Login user
router.post('/login', async (req, res) => {
    const user = await UserController.loginUser(req.body);
    if(!user) {
        res.status(404);
        res.send({"error": "No se ha encontrado al usuario"});
    } else {
        res.send(user);
    }
});

// Create user
router.post('/', async (req, res) => {
    const user = await UserController.createUser(req.body);
    if(user.error || user.validationError) {
        res.status(422);
    }
    res.send(user);
});

// Update user
router.put('/:userId', async (req, res) => {
    const updatedUser = await UserController.updateUser(req.body, req.params.userId);
    if(!updatedUser) {
        res.status(422);
        res.send({ error: "No se ha podido actualizar al usuario"} );
    } else {
        res.send(updatedUser);
    }
});

// Delete user
router.delete('/:userId', async (req, res) => {
    const removed = await UserController.deleteUser(req.params.userId);
    if(removed) {
        res.send({"removed": true});
    } else {
        res.status(404);
        res.send({"error": "No se ha eliminado al usuario"});
    }
});

module.exports = router;