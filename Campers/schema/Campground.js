const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
const imgSchema = new Schema({
    width: Number,
    height: Number
});
*/

const CampgroundSchema = new Schema({
    Campground_name: {
        type: String,
        required:true
    },
    Campground_location: {
        type: String,
        required:true
    },
    Campground_information: {
        type:String,
        required:true
    },
    Campground_image: {
        type: String
    },
    Owner_email: {
        type: String,
        //required:true
    },
});

//CampgroundSchema.index({Campground_name : 'text'}); //indexing => campground.find({$search: "검색할 문자"}})

const Campground = mongoose.model('Campground', CampgroundSchema);
module.exports = Campground;