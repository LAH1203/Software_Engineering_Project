var express = require('express');
var router = express.Router();
var msg = require('dialog');
var multer = require('multer');
const path = require("path");
const Review = require('../schema/review');
const Reservation = require('../schema/reservation');

// 후기 작성 및 수정 화면
router.get('/setreview', function(req, res) {
    var id = req.query.id;
    var camp_name;
    if (!req.session.name) {
        res.redirect('/login');
    }
  
    Reservation.findOne({_id:id},function(error, result){
        if(error){
            console.log(error);
        } else {
            //console.log(id);
            camp_name = result.Campground_name;
            if(!result.Checkin_date){
                msg.info("체크인 후 작성 가능");
                res.redirect('/');
            }
            res.render('write_and_modify_review', {id: `${id}`, camp_name:camp_name});
        } 
    });

});

//이미지 저장
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/reviewImages/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  });
  
var upload = multer({ storage: storage });

router.post('/setreview',upload.single('reviewImage'), async function(req, res) {
    // 여기에서 body-parser를 사용해서 후기 정보를 받아와주세요
    // id를 쿼리로 전달하는 것보다 이게 나을 것 같아서 이 방법을 사용하였습니다.

    const body = req.body;
    const review = new Review();
    review.Campground_name = body.camp_name;
    review.Writing_content = body.writing_content;
    review.Star_point = body.star_point;
    review.Writer_email = req.session.email;
    
    if(req.file){
        review.Image = `/reviewImages/${req.file.filename}`;
    }
    
    review.save()
    .then(newPost => {
        console.log("Create 완료");
        res.redirect("/mypage");
    })
    .catch(err => {
        res.status(500).json({
        message: err
        });
    });
});

//후기 삭제
router.get('/deleteReview', async function(req, res) {
    var review_email;
    var review_id = req.query.id;

    await Review.findOne({_id:review_id}, function(err,review){
        if(err){
            console.log(err);
        }
        else{
            review_email = review.Writer_email;
        }
    });

    if(req.session.email == review_email||req.session.mode == 3){
        Review.remove({_id:`${review_id}`}, function(err) {
            if (err) {
                msg.info('후기 삭제 실패');
                res.redirect('/main');
            }
            else {
                msg.info('후기 삭제 성공');
                res.redirect('/main');
            }
        });
    } 
    else {
        msg.info('작성자만 삭제 가능');
        res.redirect('/main');
    }

});

module.exports = router;