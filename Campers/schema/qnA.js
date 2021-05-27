const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QnASchema = new Schema({
    QnA_id: {

        type:Number,
        required:true,
        unique: true
    },
    Writer_email: {
        type: String,
        required:true
    },
    Campground_name: {
        type: String,
        required:true
    },
    Writing_date: {
        type: Date,
        required:true
    },
    Public_check: {
        type: Boolean,
        required:true
    },
    Writing_content: {
        type: String,
        required:true
    },
});

//이 이름으로 database와 commnuicate, model의 이름 설정(singular of the collection name => store constants)
//use it to save some new documents to our database collection.
const Qna = mongoose.model('QnA', QnASchema );
module.exports = Qna;
