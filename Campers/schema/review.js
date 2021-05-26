const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    Writer_email: {
        type:String,
        required:true,
        unique: true
    },
    Campground_name: {
        type:String,
        required:true
    },
    Image: {
        type:Image,
        required:true
    },
    Star_point: {
        type:Double,
        required:true
    },
    Writing_content: {
        type: String,
        required:true
    },
    Owner_email: {
        type: String,
        required:true
    },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;