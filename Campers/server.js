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
/*
   //데이터 넣기 => 
campground1.save()
    .then((result) => {
        console.log('database write successed');
    })
    .catch((err) =>{
        console.log(err);
    });

campground2.save()
    .then((result) => {
        console.log(result);
    })
    .catch((err) =>{
        console.log(err);
    });
*/

// 메인(검색) 화면
app.get(['/', '/main'], function(req, res) {
    // 데이터베이스에서 캠핑장 정보 뽑아와주세요~

    let camp_name = []
    let camp_id = []
    //var campground = mongoose.model('Schema', Campground);
    Campground.find({},{Campground_name:true,Campground_id:true},function(error, campgrounds){
        console.log('--- Read all ---');
        if(error){
            console.log(error);
        }else{
            console.log(campgrounds);
            for(var i = 0; i<campgrounds.length; i++) {

                camp_name.push(campgrounds[i].Campground_name);
                camp_id.push(campgrounds[i].Campground_id);
            }
        
               console.log(camp_name);
               res.render('main_page', { camp_name: camp_name, camp_id: camp_id });
            
            //console.log(camp_name);
            
        }  
    });
   
    /*
    Campground.find({'campgrounds.name':Campground_name}, function(err, contact){
        console.log(campgrounds.name);
        res.render('main_page', { camp_name: camp_name, camp_id: camp_id });
      });
      
      */
      
    /*
    let camp_name = ['아름이네 캠핑장', '서정이네 캠핑장', '지민이네 캠핑장', '세미네 캠핑장', '아현이네 캠핑장'];
    let camp_id = [1, 2, 3, 4, 5];
    res.render('main_page', { camp_name: camp_name, camp_id: camp_id });
    */
});

//post형식으로 프론트로부터 데이터 가져오기 result가 배열..??
app.post('/main', function (req, res) {

    let search = req.body.search;
    let name_lis = [];
    let id_lis = [];
    var mysort = {Campground_name : -1};

    //campground/find( , (err, docs))
    
    Campground.find({Campground_name: new RegExp(`${search}`)})
        .sort(mysort)
        .then((result) => {

            for(var i = 0; i < result.length ; i++){
                name_lis.push(result[i].Campground_name) ;
                id_lis.push(result[i].Campground_id);
            }
            res.render('main_page', { 
                camp_name: name_lis, camp_id: id_lis});
        })
        .catch((err) => {
            console.log(err);
        });

     /*
    const campgrounds = Campground.findOne()
        .where(search)
        .equals(req.)
    */

    /*
    opt = [{camp_name : new RegExp('${search}')},
           {Campground_location : new RegExp()}
    ]
    let campground = Camground.find({ $or: opt}); //or option

    let campground = Campground.find(
        { Campground_name: new RegExp("세미네 캠핑장")});

    console.log(campground);    
    res.render('main_page', { 
        camp_name: campground.Campground_name, camp_id: campground.Campground_id});
        */
    //1.지역선택 + 캠핑장 이름 으로 검색하고 다시 main_page.pug로 보내기
 
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
/*
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

app.listen(app.get('port'), function() {
    console.log(app.get('port') + '번 포트 연결');
});
=======

/*
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imgPath = '/path/yourimage.png';

mongoose.connect('localhost', 'testing_storeImg');

var schema = new Schema({
    img: { data: Buffer, contentType: String }
});

var A = mongoose.model('A', schema);

mongoose.connection.on('open', function () {
  console.error('mongo is open');

  A.remove(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var a = new A;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;

      console.error('saved img to mongo');
      // start a demo server
      var server = express.createServer();
      server.get('/', function (req, res, next) {
        A.findById(a, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });

      server.on('close', function () {
        console.error('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.error('closing db connection');
          mongoose.connection.close();
        });
      });

      server.listen(3333, function (err) {
        var address = server.address();
        console.error('server listening on http://%s:%d', address.address, address.port);
        console.error('press CTRL+C to exit');
      });

      process.on('SIGINT', function () {
        server.close();
      });
    });
  });

});
*/

/*
campground.save()
    .then((result) => {
        console.log('database write successed');
    })
    .catch((err) =>{
        console.log(err);
    });
    
//db로 데이터 전송(save method)
/*
app.get('/add-user', (req,res) => {
    const user = new User({
        //데이터 입력
    });

    user.save() //instance
        .then((result) => { //promise-callback
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
      });
        
})

//model(not instance)의 find method use => db에서 데이터 result 통해 가져오기
app.get('/all-blogs', (req,res)=> {
    User.find() //async
        .then((result) => {
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        }

})
//여러 데이터 중 고유 id사용해서 한 가지 데이터 블록만 가져오기
app.get('/single-blog', (req,res) => {
    Blog.findById(' ...') //STRING => 개체 ID로 변환
        .then(result) =>{
            res.send(result);
        }
})
*/