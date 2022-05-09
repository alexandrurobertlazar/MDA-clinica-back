const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
router.use(express.json());

//Controller
const ChatsController = require('../controller/ChatsController');

router.get('/', async (req, res)=>{
    const chats = await ChatsController.getAllChats();
    res.send(chats);
});

router.get('/:id', async (req, res)=>{
    const chat = await ChatsController.getChatById(req.params.id);
    res.send(chat);
});

router.get('/user/:id', async (req, res)=>{
    const chat = await ChatsController.getChatByUserId(req.params.id);
    res.send(chat);
});

router.post('/', async (req, res)=>{
    const chat = await ChatsController.createChat(req.body);
    res.send(chat);
});

router.post('/:userId', async (req, res)=>{
    const chat = await ChatsController.addMsgToChatById(req.params.userId, req.body);
    res.send(chat);
});


module.exports = router;