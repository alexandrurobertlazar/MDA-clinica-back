//Model
const Chat = require('../model/Chats');
const mongoose = require('mongoose');

const { chatHelper } = require('../helper/ChatHelper');

async function getAllChats(){
    try {
        const chats_list = await Chat.find();
        var chats = [];
        chats_list.forEach(chat =>{
            chats.push(chatHelper(chat));
        })
        return chats;   
    } catch (error) {
        return false;
    }
}

async function getChatById(id){
    try {
        let o_id = mongoose.Types.ObjectId(id);
        let filter = {"_id": o_id};
        const chat = await Chat.findOne(filter);
        return chat;   
    } catch (error) {
        return false;
    }
}

async function getChatByUserId(id){
    try {
        let o_id = mongoose.Types.ObjectId(id);
        let filter = {"user": o_id};
        const chat = await Chat.findOne(filter);
        return chatHelper(chat);   
    } catch (error) {
        return false;
    }
}

async function createChat(body){
    try{
        let existsChat = await getChatByUserId(body.user)
        if(existsChat){
            return existsChat;
        } else{
            const initialMsg = {"msg":"Bienvenido al chat con el Administrador.", "admin": true};
            body.msgs.push(initialMsg);
            const req = new Chat(body);
            let validationError = req.validateSync();
            if (validationError){
                return {"validationError" : validationError};
            }
            let id = await req.save();
            const createdChat = await Chat.findById({_id: String(id['_id'])}).exec();
            return chatHelper(createdChat);
        }
    } catch(error){
        return false;
    }
}

async function addMsgToChatById(userId, msg){
    try{
        const chat = await getChatByUserId(userId);
        chat.msgs.push(msg);
        const req = new Chat({
            _id: chat.id,
            user: chat.user,
            msgs: chat.msgs
        })
        let validationError = req.validateSync();
        if (validationError){
            return {"validationError" : validationError};
        }
        let updatedChat = await Chat.findOneAndUpdate({user: userId}, req, {new: true});
        return chatHelper(updatedChat); 
    } catch(error){
        return false;
    }
}

module.exports={getAllChats, getChatById, getChatByUserId, createChat, addMsgToChatById};