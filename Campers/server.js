var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const User = require('./schema/User');
const Campground = require('./schema/Campground');
const Review = require('./schema/review');
const Reservation = require('./schema/reservation');
const QnA = require('./schema/QnA');

var app = express();

//connect to mongodb
const dbUri = 'mongodb+srv://semi:1111@cluster0.r5t31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbUri,{useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=> app.listen(app.get('port'), ()=> {
        console.log(app.get('port') + '번 포트 연결');
    }))
    .catch((err) => console.log(err));
    
app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//MongoError: E11000 duplicate key error collection : 이미 campground로 id : 1을 추가 => 이후에 같은 id : 1의 campground1을 또 추가
const campground1 = new Campground({
    Campground_id: 1,
    Campground_name: '세미네 캠핑장',
    Campground_location: '서울',
    Campground_information:'좋아요'

});

const campground2 = new Campground({
    Campground_id: 2,
    Campground_name: '지민이네 캠핑장',
    Campground_location: '부산',
    Campground_information:'나빠요'

});

// 메인(검색) 화면
app.get(['/', '/main'], function(req, res) {
    // 데이터베이스에서 캠핑장 정보 뽑아와주세요~
    let camp_name = []
    let camp_id = []
    let camp_location = []
    //var campground = mongoose.model('Schema', Campground);
    Campground.find({},{Campground_name:true,Campground_id:true,Campground_location:true},function(error, campgrounds){
        console.log('--- Read all ---');
        if(error){
            console.log(error);
        } else {
            console.log(campgrounds);
            for(var i = 0; i<campgrounds.length; i++) {
                camp_name.push(campgrounds[i].Campground_name);
                camp_id.push(campgrounds[i].Campground_id);
                camp_location.push(campgrounds[i].Campground_location);
            }
            res.render('main_page', { camp_name: camp_name, camp_id: camp_id, camp_location: camp_location });
        } 
    });
});

//post형식으로 프론트로부터 데이터 가져오기
app.post('/main', function (req, res) {
    let search = req.body.search;
    //var lis = [];

    Campground.find({Campground_name: `${search}`}).
        then((result) => {
            //console.log(result[0].Campground_name);
            console.log(result);
            //lis.push(result);
            res.render('main_page', { 
                camp_name: result[0].Campground_name, camp_id: result[0].Campground_id});
        })
        .catch((err) => {
            console.log(err);
        });
});

// 로그인 화면
app.get('/login', function(req, res) {

});

app.post('/login', function(req, res) {
    
});

// 회원가입 화면
app.get('/signup', function(req, res) {

});

app.post('/signup', function(req, res) {

});

// 마이페이지
app.get('/mypage', function(req, res) {

});

// 후기 작성 및 수정 화면
app.get('/setreview', function(req, res) {

});

// Q&A 작성 및 수정 화면
app.get('/setqna', function(req, res) {

});

// 내 정보 수정 화면
app.get('/updatemyinfo', function(req, res) {

});

// 캠핑장 등록 및 수정 화면
app.get('/setcampinfo', function(req, res) {

});

// 상세정보 화면
app.get('/camp', function(req, res) {

});

// 예약 화면
app.get('/reservation', function(req, res) {
    res.render('reservation_page');
});

app.post('/reservation', function(req, res) {
    var totalDay = req.body.totalDay;
    var people = req.body.people;
    var price = req.body.price;
    res.render('reservation_complete_page', { totalDay: totalDay, people: people, price: price });
});