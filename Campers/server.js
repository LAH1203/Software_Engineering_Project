var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
const crypto = require('crypto');
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
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

// 메인(검색) 화면
app.get(['/', '/main'], function(req, res) {
    let camp_name = []
    let camp_id = []
    let camp_location = []

    Campground.find({},{Campground_name:true,Campground_id:true,Campground_location:true},function(error, campgrounds){
        if(error){
            console.log(error);
        } else {

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
app.post('/main', function(req, res) {
    let search = req.body.search;
    let camp_name = [];
    let camp_id = [];
    let camp_location = [];
    var mysort = { Campground_name : -1 };

    Campground.find({Campground_name: new RegExp(`${search}`)})
        .sort(mysort)
        .then((result) => {
            for(var i = 0; i < result.length ; i++) { 
                camp_name.push(result[i].Campground_name) ;
                camp_id.push(result[i].Campground_id);
                camp_location.push(result[i].Campground_location);
            }
            res.render('main_page', { 
                camp_name: camp_name, camp_id: camp_id, camp_location: camp_location });
        })
        .catch((err) => {
            console.log(err);
        });
});

// 로그인 화면
app.get('/login', function(req, res) {
    let session = req.session;

    res.render('login_page', {
        session : session
    });

});

app.post('/login', function(req, res) {
    let body = req.body;
    var dbPassword = '';
    let inputPassword = body.password;
    //let hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");
    User.findOne({Email: `${body.email}`}, function (err, result){
        
        if(err){
            res.send(err);
        } else {
            if (result == null){
                console.log("읍다..")
                res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>로그인 실패</h1>');
                res.write("<br><br><a href='/'>다시 로그인하기</a>");
                res.end();
            }else {
                dbPassword=result.Password;
                if(dbPassword === inputPassword){
                    console.log("비밀번호 일치");
                    // 세션 설정
                    req.session.email = body.email;
                    req.session.mode = result.Mode;
                    req.session.name = result.Name;
                    req.session.phoneNumber = result.Phone_number;
                    res.redirect('/');
                }else{
                    console.log("비밀번호 불일치");
                    console.log(dbPassword);
                    //console.log(inputPassword);
                    res.redirect('/login');
                }
            }
        }
        
    });
    
});

// 회원가입 화면
app.get('/signup', function(req, res) {

});

app.post('/signup', function(req, res) {

});

// 마이페이지
app.get('/mypage', function(req, res) {
    // 세션에 사용자 정보가 저장되어있지 않을 경우 로그인 하지 않은 상태이므로 로그인을 먼저 하도록 함
    if (!req.session.email) {
        res.redirect('/login');
    }
    var userInfo = {};
    userInfo.name = req.session.name;
    userInfo.email = req.session.email;
    userInfo.phoneNumber = req.session.phoneNumber;
    userInfo.mode = req.session.mode;
    var sortByDate = { Start_date : -1 };

    let _id = [];
    let campgroundName = [];
    let startDate = [];
    let endDate = [];
    let approvalDate = [];
    let checkinDate = [];

    Reservation.find({Reservation_email: new RegExp(`${userInfo.email}`)})
        .sort(sortByDate)
        .then((result) => {
            for(var i = 0; i < result.length ; i++) {
                _id.push(result[i]._id);
                campgroundName.push(result[i].Campground_name);
                startDate.push(result[i].Start_date);
                endDate.push(result[i].End_date);
                approvalDate.push(result[i].Approval_date);
                checkinDate.push(result[i].Checkin_date);
            }
            res.render('MyPage', {
                userInfo: userInfo,
                _id: _id,
                campgroundName: campgroundName,
                startDate: startDate,
                endDate: endDate,
                approvalDate: approvalDate,
                checkinDate: checkinDate
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

// 후기 작성 및 수정 화면
app.get('/setreview', function(req, res) {
    res.render('write_and_modify_review');
});

// Q&A 작성 및 수정 화면
app.get('/setqna', function(req, res) {
    res.render('write_and_modify_QnA');
});

// 내 정보 수정 화면
app.get('/updatemyinfo', function(req, res) {

});

// 캠핑장 등록 및 수정 화면
app.get('/setcampinfo', function(req, res) {
    res.render('add_and _modify_campground');
});

// 상세정보 화면
app.get('/camp', function(req, res) {

});

// 예약 화면
app.get('/reservation', function(req, res) {
    res.render('reservation_page');
});

// 예약 취소
app.get('/deleteReservation', function(req, res) {
    var id = req.query.id;
    Reservation.remove({_id: `${id}`}, function(err) {
        if (err) throw err;
        console.log('예약 삭제 성공!');
    });
    res.redirect('/mypage');
});

// 로그아웃
// 세션 정보 지우기
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err)
            console.log('로그아웃 실패');
        else
            res.redirect('/');
    });
});

// 회원탈퇴
app.get('/deleteUserInfo', function(req, res) {
    var email = req.query.email;
    User.remove({Email: `${email}`}, function(err) {
        if (err) throw err;
        console.log('회원 탈퇴 성공!');
    });
    res.redirect('/');
});

app.post('/reservation', function(req, res) {
    var totalDay = req.body.totalDay;
    var people = req.body.people;
    var price = req.body.price;
    res.render('reservation_complete_page', { totalDay: totalDay, people: people, price: price });
});