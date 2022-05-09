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
//Views
const treatments = require('./view/TreatmentView');
app.use('/treatments', treatments);
//Views
const patientSpecialists = require('./view/PatientSpecialistView');
app.use('/patientSpecialist', patientSpecialists);
const history = require('./view/HistoryAuxView');
app.use('/history', history);
const analytics = require('./view/AnalyticsView');
app.use('/analytics', analytics);
const chats = require('./view/ChatsView');
app.use('/chats', chats);


// Specialist request views
const specialistRequest = require('./view/SpecialistRequestView');
app.use('/requests', specialistRequest)

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log('App iniciada');
});