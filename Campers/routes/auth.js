var express = require('express');
var router = express.Router();
var msg = require('dialog');
const path = require('path');
var bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require( '../schema/user');

//로그인
router.get('/login', function(req, res) {
    res.render('login_page')
});

router.post('/login', function(req, res) {
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

// 로그아웃
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            msg.info('로그아웃 실패');
            res.redirect('/mypage');
        } else {
            msg.info('로그아웃 성공');
            res.redirect('/');
        }
    });
});

// 회원가입 화면
router.get('/signup', function(req, res) {
    res.render('signup_page');
});

router.post('/signup', function(req, res) { 
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var phone_number = req.body.phone;
    var mode = req.body.usertype;

    try{    
        User.find({Email : `${email}`}, (err, userObj) => {
            if(err) console.log(err.message);

            if(userObj.length >= 1){
                return res
                    .status(400)
                    .json({errors : [{ msg : "User already exists"}]})
            }         
            user = new User({
                Email : email, 
                Password : password,
                Name : name,
                Phone_number : phone_number,
                Mode : mode
            });

            const salt = bcrypt.genSaltSync(10);
            user.Password = bcrypt.hashSync(password, salt);
            //동기로 하니까 왜돼..???????????????????????????
            //var password = 해시코드 하면 또 왜안돼..??..user.Password하면됌

            user.save()
                .then((result) => {
                    res.redirect('/login');
                    console.log("singup successd");
                })
                .catch((err) => {
                    console.log(err.message);
                })
           //create로 하면 또 왜안돼...????????????? 주석 지우지마세용
           /*
            User.create({ //생성 + save까지
                Email : email, 
                Password : password,
                Name : name,
                Phone_number : phone_number,
                Mode : mode
            }).then((result) => {
                res.redirect('/login');
            }).catch((err) => {
                 console.log(err.message)
            });
            */              
        });

    }catch(error){
        msg.info('회원가입 실패');
        res.redirect('/singup');                 
    }
    
});

//회원 탈퇴
router.get('/deleteUserInfo', function(req, res) {
    var email = req.query.email;
    User.remove({Email: `${email}`}, function(err) {
        if (err) {
            msg.info('회원탈퇴 실패');
            res.redirect('/mypage');
        }
        else {
            msg.info('회원탈퇴 성공');
            res.redirect('/');
        }
    });
});

module.exports = router;