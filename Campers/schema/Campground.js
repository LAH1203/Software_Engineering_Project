const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
    width: Number,
    height: Number
});

const CampgroundSchema = new Schema({
    Campground_id: {
        type: Number,
        required:true,
        unique: true
    },
    Campground_name: {
        type: String,
        required:true
    },
    Campground_location: {
        type: String,
        required:true
    },
    Campground_information: {
        type: String,
        required:true
    },
    Campground_image: imgSchema,
    Owner_email: {
        type: String,
        required:true
    },
});

const Campground = mongoose.model('Campground', CampgroundSchema);
module.exports = Campground;
