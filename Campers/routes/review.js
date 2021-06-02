var express = require('express');
var router = express.Router();
var msg = require('dialog');
const Review = require('../schema/review');
const Reservation = require('../schema/reservation');

// 후기 작성 및 수정 화면
router.get('/setreview', function(req, res) {
    var id = req.query.id;
    
    Reservation.findOne({_id:id},function(error, result){
        if(error){
            console.log(error);
        } else {
            camp_name = result.Campground_name;
            res.render('write_and_modify_review', {id: `${id}`, camp_name:camp_name});
        } 
    });
});

router.post('/setreview', function(req, res) {
    // 여기에서 body-parser를 사용해서 후기 정보를 받아와주세요
    // id를 쿼리로 전달하는 것보다 이게 나을 것 같아서 이 방법을 사용하였습니다.
    //, image : image
    const body = req.body;

    const review = new Review();
    review.Campground_name = body.camp_name;
    review.Writing_content = body.writing_content;
    review.Star_point = body.star_point;
    review.Writer_email = req.session.email;
    
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
router.get('/deletereview', function(req, res) {
    //if (req.session.email == )
    var review_id = req.query.id;
    Review.remove({_id: `${review_id}`}, function(err) {
        if (err) {
            msg.info('캠핑장 삭제 실패');
            res.redirect('/main');
        }
        else {
            msg.info('캠핑장 삭제 성공');
            res.redirect('/main');
        }
    });
});

module.exports = router;