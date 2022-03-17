//Model
const Appointment = require('../model/Appointment');
const App_Usr = require('../model/App_Usr');
const mongoose = require('mongoose');


const { appointmentHelper } = require('../helper/AppointmentHelper');

async function getAllAppointments(){
    return await Appointment.find();
}


//Cuando se complete la historia de CRUD de usuarios se deberá guardar el ID del paciente y no el nombre
//tanto en el Schema de Appointment como en el de App_usr
async function createAppointment(body){
    const req = new Appointment({
        title: body.title,
        pacient: body.pacient,
        especialist: body.especialist,
        date: convertFromStringToDate(body.date),
        desc: body.desc
    });
    let id = await req.save();
    const createdAppointment = await Appointment.findById({_id: String(id['_id'])}).exec();
    const req2 = new App_Usr({
        appointment: id['_id'],
        user: body.pacient  
    });
    await req2.save();
    return appointmentHelper(createdAppointment);
}

async function updateAppointment(body, id){
    
    let o_id= mongoose.Types.ObjectId(id.trim());

    const req = new Appointment({
        _id: o_id,
        title: body.title,
        pacient: body.pacient,
        especialist: body.especialist,
        date: convertFromStringToDate(body.date),
        desc: body.desc
    });
    let updatedAppointment = await Appointment.findOneAndUpdate({_id: o_id}, req, {new: true});
    return appointmentHelper(updatedAppointment);
}

async function deleteAppointment(id){
    try{
        let o_id = mongoose.Types.ObjectId(id.trim());
        let remove1 = await Appointment.findByIdAndDelete(o_id);
        let remove2 = await App_Usr.deleteOne({appointment: id}).exec();
        return (remove1 !==null && remove2!==null);
    } catch (error){
        console.log(error);
        return false;   
    }
}

function convertFromStringToDate(responseDate) {
    let dateComponents = responseDate.split('T');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
                         timePieces[0], timePieces[1], timePieces[2]))
}

module.exports= {getAllAppointments, createAppointment, updateAppointment, deleteAppointment};