var express = require('express');
var router = express.Router();
var msg = require('dialog');
var multer = require('multer');
const path = require("path");
const Review = require('../schema/review');
const Reservation = require('../schema/reservation');

// 후기 작성 및 수정 화면
var id ;
router.get('/setreview', function(req, res) {
    var camp_name;
    id = req.query.id;
    if (!req.session.name) {
        res.redirect('/login');
    }

    //check_Mode= check(req.query.id);
  
    Reservation.findOne({_id:id})
    .then((result)=>{
        if(result){
            if(!result.Checkin_date){
                msg.info("체크인 후 작성 가능");
                res.redirect('/');
            }
            else{
                camp_name = result.Campground_name;
                res.render('write_and_modify_review', {id: `${id}`, camp_name:camp_name});
            }
        }
        else{
            Review.findOne({_id:id})
            .then((result)=>{
            if(result && req.session.email==result.Writer_email){
                camp_name = result.Campground_name;
                res.render('write_and_modify_review', {id: `${id}`, camp_name:camp_name});
            }
            else{
                msg.info("작성자만 수정가능");
                res.redirect('/');
            }
        })
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
    var body = req.body;
    var file = req.file;

    Reservation.findOne({_id:id})
    .then((result)=>{
        if(result){
            const review = new Review();
            review.Campground_name = body.camp_name;
            review.Writing_content = body.writing_content;
            review.Star_point = body.star_point;
            review.Writer_email = req.session.email;
            
            if(file){
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
        }
        else{
            Review.updateMany({_id:id},{$set: {
                Writing_content: body.writing_content,
                Star_point: body.star_point,
                if(file){
                    Image = `/reviewImages/${req.file.filename}`;
                }
    
            }})
            .then(newPost => {
                console.log("update 완료");
                res.redirect("/");
            })
            .catch(err => {
                console.log(req.query.id);
                res.status(500).json({
                message: err
                });
            });
        }
    });
});  

    

//수정, 추가 구분 함수
async function check(id){
    await Reservation.findOne({_id:id})
    .then((result)=>{
        if(result){
            return result;
        }
    })

    Review.findOne({_id:id})
    .then((result)=>{
        if(result){
            return result;
        }
    })
}
//후기 삭제
router.get('/deleteReview', async function(req, res) {
    var review_email;
    var review_id = req.query.id;

    Review.findOne({_id:review_id})
    .then((review)=>{
        review_email = review.Writer_email;
            //본인, 관리자만 삭제 가능
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
    })
     

});

module.exports = router;