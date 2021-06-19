var express = require('express');
var router = express.Router();
var msg = require('dialog');
const Reservation = require('../schema/reservation');
const Campground = require('../schema/Campground');
const User = require( '../schema/user');



// 마이페이지
router.get('/mypage', function(req, res) {
    // 세션에 사용자 정보가 저장되어있지 않을 경우 로그인 하지 않은 상태이므로 로그인을 먼저 하도록 함
    
    if (!req.session.name) {
        res.redirect('/login');
    }
    var userInfo = {};
    userInfo.name = req.session.name;
    userInfo.email = req.session.email;
    userInfo.phoneNumber = req.session.phoneNumber;
    userInfo.mode = req.session.mode;
    // 고객
    if (userInfo.mode == 0) {
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
                for (var i = 0; i < result.length ; i++) {
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
    }
    // 캠핑장 주인
    else if (userInfo.mode == 1) {
        let camp_id = [];
        let camp_name = [];
        let camp_location = [];
        let reservation_email = [];
        let start_date = [];
        let end_date = [];
        let number_of_people = [];
        let reservation_id = [];

     
        Campground.find({Owner_email: `${userInfo.email}`})
            .then((result) => {
                for (var i = 0; i < result.length ; i++) { 
                    camp_name.push(result[i].Campground_name);
                    camp_id.push(result[i]._id);
                    camp_location.push(result[i].Campground_location);
                }
                for (var i = 0; i < camp_name.length; i++) {
                    Reservation.find({Campground_name: `${camp_name[i]}`})
                        .then((result2) => {
                            for (var j = 0; j < result2.length; j++) {
                                reservation_email.push(result2[j].Reservation_email);
                                start_date.push(result2[j].Start_date);
                                end_date.push(result2[j].End_date);
                                number_of_people.push(result2[j].Number_of_people);
                                reservation_id.push(result2[j]._id);
                            }
                            res.render('mypage_owner', {
                                userInfo: userInfo,
                                camp_name: camp_name,
                                _id: camp_id,
                                camp_location: camp_location,
                                reservation_email: reservation_email,
                                start_date: start_date,
                                end_date: end_date,
                                number_of_people: number_of_people,
                                reservation_id: reservation_id
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                /*
                res.render('mypage_owner', {
                    userInfo: userInfo,
                    camp_name: camp_name,
                    camp_id: camp_id,
                    camp_location: camp_location,
                    reservation_email: reservation_email,
                    start_date: start_date,
                    end_date: end_date,
                    number_of_people: number_of_people
                });
                */
                
            })
            .catch((err) => {
                console.log(err);
            });
            
    }
    
    // mode가 2면 관리자
    else if (userInfo.mode == 2) {
        msg.info('관리자는 마이페이지가 존재하지 않습니다.');
        res.redirect('/');
    }

 
});

// 내 정보 수정 화면
router.get('/updatemyinfo', function(req, res) {
    res.render('updatemyinfo_page');
});

router.post('/updatemyinfo', function(req, res) {
    //1.현재 로그인한 사람이 누군지 정보 가져오기
    const currentUser = req.session.email;

    const { name : name, email : email, password : password, phone: number } = req.body;
    var password2 = req.body.password2;

    User.findOne({Email : new RegExp(`${currentUser}`)})
        .then((resultUser) => { 
            //비밀번호 재확인, 일치하지 않으면 다시 수정 페이지 돌아가기
            if(password2 != password){
                console.log('password unvalid. Please Try again.');
                res.redirect('/updatemyinfo');
            }
            /*
             //둘다 코드 돌아감 
             User.updateMany({Email : resultUser.Email},{$set: {
                Email : email,
                Name : name,
                Password : password,
                Phone_number : number      
            }})
            .then((result) => {
                console.log('success to update my info')
                res.redirect('/main');
            })
            .catch((err) => {
                res.status(400)
                    .json({errors : [{ msg : "failed to update my info"}]})
            })
            */
            resultUser.updateOne({Email : email, Name : name, Password : password, Phone_number : number}, 
                (err, result) => {
                    if(err) console.log(err.message);            
                    res.redirect('/main');
                });
        })
        .catch((err) => {
            return res
                .status(400)
                .json({errors : [{ msg : err + "failed to update my info"}]})
        });
        
});

module.exports = router;