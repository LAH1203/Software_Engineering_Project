const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    Reservation_email: {
        type: String,
        required:true,
        unique: true
    },
    Campground_name: {
        type: String,
        required:true
    },
    Reservation_date: {
        type: Date,
        required:true
    },
    Number_of_people: {
        type:Number,
        required:true
    },
    Approval_date: {
        type: Date,
        required:true
    },
    Checkin_date: {
        type: Date,
        required:true
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema );
module.exports = Reservation;
