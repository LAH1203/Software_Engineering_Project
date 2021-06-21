var express = require('express');
var router = express.Router();
var msg = require('dialog');
var multer = require('multer');
const path = require("path");
const Campground = require('../schema/Campground');
const QnA = require('../schema/QnA');
const Review = require('../schema/review');

router.use(express.json());

// 캠핑장 등록 및 수정 화면
router.get('/setcampinfo', function(req, res) {
    // id 쿼리가 존재하면 수정, 존재하지 않으면 등록입니다!
    res.render('add_and _modify_campground');
    check = req.query.id;
});


//이미지 저장
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/campImages/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage: storage });

router.post('/setcampinfo', upload.single('campground_image'), function(req, res){
    var body = req.body;
    if (check == null){
        var campground = new Campground();
        campground.Campground_name = body.campground_name;
        campground.Campground_location = body.campground_location;
        campground.Campground_information = body.campground_info;
        campground.Campground_image = `/campImages/${req.file.filename}`
        campground.Owner_email = req.session.email;
        campground.save()
        .then(newPost => {
            console.log("Create 완료");
            res.redirect("/mypage");
        })
        .catch(err => {
            res.status(500).json({
            message: err
            });
        });
    } 
    else{
        Campground.updateMany({_id:check},{$set: {
            Campground_name : body.campground_name,
            Campground_location : body.campground_location,
            Campground_information : body.campground_info,
            Campground_image :`/campImages/${req.file.filename}`
        }})
        .then(newPost => {
            console.log("update 완료");
            res.redirect("/mypage");
        })
        .catch(err => {
            console.log(req.query.id);
            res.status(500).json({
            message: err
            });
        });
    }
});

// 캠핑장 삭제
router.get('/deletecampinfo', function(req, res) {
    var camp_id = req.query.id;
    Campground.remove({_id: `${camp_id}`}, function(err) {
        if (err) {
            msg.info('캠핑장 삭제 실패');
            res.redirect('/mypage');
        }
        else {
            msg.info('캠핑장 삭제 성공');
            res.redirect('/mypage');
        }
    });
});


// 상세정보 화면
router.get('/camp', function(req, res) {
    var camp_name ='';
    var camp_location = '';
    var camp_information = '';
    var camp_image = '';
    //리뷰
    let writing_content = [];
    var star_point = [];
    var review_id = [];
    var review_image = [];
    var qna_content = [];
    var qna_comment = [];
    var camp_QnA = "큐엔에이";
    var qna_id = [];
    var review_email=[];
    //let camp_image ='';
 
    var camp_id = req.query.camp_id;
    var user_email = req.session.email;
    var user_mode = req.session.mode;
    var check = req.query.check;

    Campground.findOne({_id:camp_id},function(error, campgrounds){
        if(error){
            console.log(error);
        } else {
            camp_name = campgrounds.Campground_name;
            camp_location = campgrounds.Campground_location;
            camp_information = campgrounds.Campground_information;
            camp_image = campgrounds.Campground_image;

            Review.find({Campground_name:camp_name},function(error, result){
                if(error){
                    console.log(error);
                } else {
                    for(let i = 0;  i < result.length ; i++){
                        writing_content.push(result[i].Writing_content);
                        star_point.push(result[i].Star_point);
                        review_id.push(result[i]._id);
                        review_image.push(result[i].Image);
                        review_email.push(result[i].Writer_email);
                    }
                    console.log(writing_content);
                    
                    QnA.find({Campground_id : camp_id}, function(error, qnaResult){
                        if(error){
                            console.log(error);
                        }else{
                            for(let i = 0; i < qnaResult.length ; i++){
                                qna_content.push(qnaResult[i].Writing_content);   //질문 내용
                                qna_comment.push(qnaResult[i].Comment_content);   //댓글 
                                qna_id.push(qnaResult[i]._id);         //큐엔에이 아이디
                            }
                            console.log(qna_content);
                            res.render('campground', {id : camp_id, camp_name: camp_name, camp_location: camp_location, 
                                camp_information: camp_information, camp_image:camp_image, camp_review: writing_content, star_point:star_point, 
                                user_email: user_email, user_mode: user_mode, review_id : review_id, review_image:review_image,review_email:review_email,
                                camp_QnA : qna_content, qna_id : qna_id, check: check});
                        }
                    });                   

                }
            });

            
    }
});
});


module.exports = router;
