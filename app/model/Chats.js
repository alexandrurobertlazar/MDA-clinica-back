const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserController = require('../controller/UserController');

const validateUser = async function(user){
    const userValidate = await UserController.getUserById(user);
    if(userValidate){
        if(userValidate.role === "patient" ){
            return true;
        } 
        return false;
    } else{
        return false;
    }
}

const MsgSchema = new Schema({
    msg: {
        type: String,
        required: "El mensaje es obligatorio"
    },
    admin:{
        type: Boolean,
        required: "El campo emisor es obligatorio"
    }
})

const ChatsSchema = new Schema({
    user: {
        type: String,
        required: "El paciente es obligatorio",
        validate: [validateUser, "No existe este paciente"]
    },
    msgs: {
        type: [MsgSchema]
    }
});

const Chat = mongoose.model('Chat', ChatsSchema);

module.exports = Chat;