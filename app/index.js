const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Config
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/mda-clinica';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Server config
const app = express();
const port = 3000;

// CORS
app.use(cors())

// Views
const users = require('./view/UserView');
app.use('/users', users);
//Views
const appointments = require('./view/AppointmentsView');
app.use('/appointments', appointments)

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log('App iniciada');
});