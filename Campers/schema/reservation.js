const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    Reservation_email: {
        type: String,
        required:true,
        unique: true
    },
    Campground_id: {
        type: String,
        required:true
    },
    Start_date: {
        type: Date,
        required:true
    },
    End_date: {
        type: Date,
        required:true
    },
    Number_of_people: {
        type:Number,
        required:true
    },
    Approval_date: {
        type: Date,
    },
    Checkin_date: {
        type: Date,
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema );
module.exports = Reservation;