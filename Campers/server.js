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
    .then((result)=> console.log('connect to  db'))
    .catch((err) => console.log(err));
    
app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
//db
app.get('/add-user', (req,res) => {
    const user = new User({
        //데이터 입력
    });

    user.save()
        .then((result) => { //promise-callback
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
      });
        
})
*/
// 메인(검색) 화면
app.get(['/', '/main'], function(req, res) {
    // 데이터베이스에서 캠핑장 정보 뽑아와주세요~
    let camp_name = ['아름이네 캠핑장', '서정이네 캠핑장', '지민이네 캠핑장', '세미네 캠핑장', '아현이네 캠핑장'];
    let camp_id = [1, 2, 3, 4, 5];
    res.render('main_page', { camp_name: camp_name, camp_id: camp_id });
});

app.post('/main', function(req, res) {
    let search = req.body.search;
    // 여기에서 search 검색어를 바탕으로 검색 수행해주시면 됩니다!
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

app.listen(app.get('port'), function() {
    console.log(app.get('port') + '번 포트 연결');
});