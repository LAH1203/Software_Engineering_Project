var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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

// 메인(검색) 화면
app.get(['/', '/main'], function(req, res) {

});

// 로그인 화면
app.get('/login', function(req, res) {

});

// 회원가입 화면
app.get('/signup', function(req, res) {

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