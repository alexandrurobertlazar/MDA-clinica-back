//Model
const Appointment = require('../model/Appointment');
const mongoose = require('mongoose');

async function getAllAppointments(){
    return await Appointment.find();
}

async function createAppointment(body){
    const req = new Appointment({
        title: body.title,
        pacient: body.pacient,
        especialist: body.especialist,
        date: convertFromStringToDate(body.date),
        desc: body.desc
    });
    id = await req.save();
    const createdAppointment = await Appointment.findById({_id: String(id['_id'])}).exec();
    return createdAppointment;
}

async function deleteAppointment(id){
    
    await Appointment.deleteOne({_id: mongoose.Types.ObjectId(id.trim())}).exec()
        .catch((err) => { success: false });
    return {
        success: true
    };
}

function convertFromStringToDate(responseDate) {
    let dateComponents = responseDate.split('T');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
                         timePieces[0], timePieces[1], timePieces[2]))
}

module.exports= {getAllAppointments, createAppointment, deleteAppointment};