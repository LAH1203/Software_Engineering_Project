const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
const imgSchema = new Schema({
    width: Number,
    height: Number
});
*/
const ReviewSchema = new Schema({
    Writer_email: {
        type: String,
        required:true,
        unique: true
    },
    Campground_name: {
        type:String,
        required:true
    },
    Image: {
        type:{
            data: Buffer,
            contentType: String
        },
        //required:true
    },
    Star_point: {
        type: Number,
        required:true
    },
    Writing_content: {
        type: String,
        required:true
    }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;