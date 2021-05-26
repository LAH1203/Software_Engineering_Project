const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampegroundSchema = new Schema({
    Campground_id: {
        type:Int,
        required:true,
        unique: true
    },
    Campground_name: {
        type:String,
        required:true
    },
    Campground_location: {
        type:String,
        required:true
    },
    Campground_information: {
        type:String,
        required:true
    },
    Campground_image: {
        type: Image,
        required:true
    },
    Owner_email: {
        type: String,
        required:true
    },
});

const Campground = mongoose.model('Campground', CampgroundSchema);
module.exports = Campground;
