var express = require('express');
var router = express.Router();
var msg = require('dialog');
const Campground = require('../schema/Campground');

// 캠핑장 등록 및 수정 화면
router.get('/setcampinfo', function(req, res) {
    // id 쿼리가 존재하면 수정, 존재하지 않으면 등록입니다!
    res.render('add_and _modify_campground');
    //console.log('get',req.query.id);
    check = req.query.id;
    //console.log('check',check);
});

router.post('/setcampinfo', function(req, res){
    const body = req.body;
    if (check == null){
        const campground = new Campground();
        campground.Campground_name = body.campground_name;
        campground.Campground_location = body.campground_location;
        campground.Campground_information = body.campground_info;
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
            Campground_information : body.campground_info
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
    //let camp_image ='';
    var camp_QnA = '큐앤에이';
    var camp_review = '리뷰게시판';

    var camp_id = req.query.camp_id;
    
    Campground.findOne({_id:camp_id},function(error, campgrounds){
        if(error){
            console.log(error);
        } else {
            camp_name = campgrounds.Campground_name;
            camp_location = campgrounds.Campground_location;
            camp_information = campgrounds.Campground_information;
            res.render('campground', {id : camp_id, camp_name: camp_name, camp_location: camp_location, 
                camp_information: camp_information, camp_QnA: camp_QnA, camp_review: camp_review});
        } 
    });
});



module.exports = router;
