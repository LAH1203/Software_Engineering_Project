var express = require('express');
var router = express.Router();
var msg = require('dialog');
const QnA = require('../schema/QnA');
const Campground = require('../schema/Campground');

// Q&A 작성 및 수정 화면
var camp_name = '세미';
router.get('/setqna', function(req, res) {
    var id = req.query.id;
    res.render('write_and_modify_QnA', {id: `${id}`}, {name: camp_name});
    //무한 로딩..왜이랭
    /*
    Campground.findOne( {_id :`${id}`}, (err, campResult) => {
        if(err) { console.log(err);}

        camp_name = campResult.Campground_name;
        res.render('write_and_modify_QnA', {id: `${id}`}, {name: `${camp_name}`});
    });
    */
});

router.post('/setqna', function(req, res) {
    // 여기에서 body-parser를 사용해서 qna 정보를 받아와주세요 => id
    // id를 쿼리로 전달하는 것보다 이게 나을 것 같아서 이 방법을 사용하였습니다.
    //1.qna 추가
    var email = req.session.email;
    var id = req.body.id;
    var date = new Date(); //현재시각
    var check = false; //기본값 false
    var write_content = req.body.description;
    var comment_content = null;

    Qna.create({
        writer_email : email,
        Campground_id : id,
        Writing_date : date,
        Public_check : check,
        Writing_content : write_content,
        Comment_content : comment_content
    }).then((result) => {
        console.log('qna into db successed');
    }).catch((err) => {
        msg.info('qna 작성 실패')
    })

    //qna 수정


    //qna 삭제

});

module.exports = router;