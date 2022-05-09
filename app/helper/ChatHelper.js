function dataHelper(data){
    let res = [];
    data.forEach(element => {
        res.push({"msg": element.msg, "admin": element.admin})
    });
    return res;
}

function chatHelper(chat) {
    let data = dataHelper(chat.msgs)
    return {
        "id": chat.id,
        "user": chat.user,
        "msgs": data,
    }
}

module.exports = { chatHelper };