const mongoose = require('mongoose');
const { Schema } = mongoose;

const App_UsrSchema = new Schema ({
    appointment: String,
    user: String
});

const App_Usr =  mongoose.model('App_usr', App_UsrSchema);

module.exports = App_Usr;