var express = require('express');
var router = express.Router();
var msg = require('dialog');
const Reservation = require('../schema/reservation');
const Campground = require('../schema/Campground');
const User = require('../schema/user');


//예약
var camp_Name = null;
router.get('/reservation', function(req, res) {
    //해당 캠핑장 정보 받아오기
    var camp_Id = req.query.id;
    var e_mail = req.session.email;

    //로그인 해야지 예약 가능 추가 
    if(!e_mail){
        res.redirect('/login');
    }else{
        //캠핑장 주인은 예약 불가능 추가
        User.findOne({Email : `${e_mail}`}, (err, resultUser) => {
            if(err){console.log(err);}
    
            var mode = resultUser.Mode;
            if(mode == 1){
                res.redirect('/mypage');
            }
        });
    }
  
    Campground.findOne({ _id :`${camp_Id}` }, (err, result) => {
        if(err){
            return res
                .status(400)
                .json({ err : [{ msg : "campground not found"}]});
        }
        camp_Name = result.Campground_name;
        res.render('reservation_page');
    });

});

router.post('/reservation', function(req, res) {
    //이메일 중복 에러 잡고 화면으로 안된다고 알림창ㄱ 
    var startDay = req.body.startDay;
    var EndDay = req.body.endDay;
    var totalDay = req.body.totalDay;
    var people = req.body.people;
    var price = req.body.price;
    var campName = camp_Name;
    var email = req.session.email;
    var approveDay = null;
    var checkinDay = null;

    const reservation = new Reservation({
        Reservation_email : email, //현재 로그인 유저
        Campground_name : campName ,
        Start_date : startDay,
        End_date : EndDay, 
        Number_of_people : people,
        Approval_date : approveDay,
        Checkin_date : checkinDay,
    });

    reservation.save()
        .then((result) => {
            console.log('reservation write to DB successed');
        })
        .catch((err) => {
            console.log(err);
        });

    res.render('reservation_complete_page', { totalDay: totalDay, people: people, price: price });      
});

//체크인 
router.get('/checkinReservation', function(req, res) {
    var id = req.query.id;
    var now = new Date();
    Reservation.updateOne({_id: `${id}`}, {Checkin_date: `${now}`}, function(err) {
        if (err) throw err;
        msg.info('예약 체크인 성공');
    });
    res.redirect('/mypage');
});

//예약 승인
router.get('/approvalReservation', function(req, res) {
    var id = req.query.id;
    // 첫 번째 인자 -> 수정할 대상
    // 두 번째 인자 -> 수정할 내용
    var now = new Date();
    Reservation.updateMany({_id: `${id}`}, {Approval_date: `${now}`}, function(err) {
        if (err) throw err;
        msg.info('예약 승인 성공');
    });
    res.redirect('/mypage');
});

//예약 취소
router.get('/deleteReservation', async function(req, res) {
    var id = req.query.id;  

    //예약의 승인이 완료되어 취소가 불가능한 경우, 취소가 불가능하다는 경고 메시지를 띄운다.
    await Reservation.findOne({_id:id})
    .then((result)=>{
        if(result.Approval_date != null ){
            msg.info("취소가 불가능합니다.");
            res.redirect("back");
        }
        else{
            Reservation.remove({_id: `${id}`}, function(err) {
                if (err) throw err;
                console.log(result.Approval_date);
                msg.info('예약 취소 성공');
            });
            res.redirect('/mypage');

        }
    })
  
});

module.exports = router;