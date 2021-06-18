var express = require('express');
var router = express.Router();
var msg = require('dialog');
const QnA = require('../schema/QnA');
const Campground = require('../schema/Campground');
const Qna = require('../schema/QnA');

// Q&A 작성 및 수정 화면
var id = null;
router.get('/setqna', function(req, res) {

    var Email = req.session.email;
    //로그인 안했으면 퇴출당해야지
    if(!Email){
        res.redirect('/login');
    }

    id = req.query.id;  //id로 이름 찾아서 화면에 내보내기
    Campground.findOne( {_id :`${id}`}, (err, campResult) => {
        if(err) { console.log(err);}

        var camp_name = campResult.Campground_name;
        res.render('write_and_modify_QnA', {name: `${camp_name}`});
    });
    
});

router.post('/setqna', function(req, res) {
    // 여기에서 body-parser를 사용해서 qna 정보를 받아와주세요 => id
    // id를 쿼리로 전달하는 것보다 이게 나을 것 같아서 이 방법을 사용하였습니다.
    //1.qna 등록하고 수정을 같이 해야지..버튼에 value(모드) 전달해서, Qna.Update로 해주기(수정 버튼이면)

     // id 쿼리가 존재하면 수정, 존재하지 않으면 등록입니다!
    var email = req.session.email;
    var date = new Date(); //현재시각
    var check = false; //기본값 false
    var write_content = req.body.description;
    var comment_content = null;
    var campId = id;
 
    var qna = new Qna({
        Campground_id : campId,
        Writer_email : email,
        Writing_date : date,
        Public_check : check,
        Writing_content : write_content,
        Comment_content : comment_content
    });
    qna.save()
        .then((result)=>{console.log(result);})
        .catch((err) => {console.log(err);});
    /*
    QnA.create({
        Campground_id : campId,
        Writer_email : email,
        Writing_date : date,
        Public_check : check,
        Writing_content : write_content,
        Comment_content : comment_content
    }).then((result) => {
        console.log('qna into db successed');
    }).catch((err) => {
        console.log(err);
        msg.info('qna 작성 실패');
    });
*/
    //qna 수정

});


router.post('/deleteQna', function(req,res){
    //qna _id받아와서 삭제..
    var qna_id = req.query.id;
    Qna.remove({_id : `${qna_id}`}, (req, res) => {
        if (err) {
            msg.info('qna 삭제 실패');
            res.redirect('/camp');
        }
        else {
            msg.info('qna 삭제 성공');
            res.redirect('/camp');
        }
    });

})

// qna 삭제
router.get('/deleteqna', function(req, res) {
    var id = req.query.id;
    Qna.remove({_id: `${id}`}, function(err) {
        if (err) {
            msg.info('Q&A 삭제 실패');
            res.redirect('/main');
        }
        else {
            msg.info('Q&A 삭제 성공');
            res.redirect('/main');
        }
    });
});

module.exports = router;