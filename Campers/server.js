var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var msg = require('dialog');
var mongoose = require('mongoose');
var app = express();

//connect to mongodb
const dbUri = 'mongodb+srv://semi:1111@cluster0.r5t31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri,{useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=> app.listen(app.get('port'), ()=> {
        console.log(app.get('port') + '번 포트 연결');
    }))
    .catch((err) => console.log(err));

/*
// Mongo Sync
var sync_mongo_server = require('mongo-sync').Server;
var server = new sync_mongo_server('0.0.0.0');
var sync_database = server.db('myFirstDatabase');
*/

app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


const loginRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const mypageRouter = require('./routes/mypage');
const campgroundRouter = require('./routes/campground');
const reviewRouter = require('./routes/review');
const reservationRouter = require('./routes/reservation');
const qnaRouter = require('./routes/qna');


// main
app.use( '/',mainRouter);
// 로그인 화면
app.use('/',loginRouter);
// 마이페이지
app.use('/',mypageRouter);
// 캠핑장
app.use('/',campgroundRouter);
// 리뷰
app.use('/',reviewRouter);
// 예약
app.use('/',reservationRouter);
// qna
app.use('/',qnaRouter);





