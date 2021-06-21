var express = require('express');
var router = express.Router();
var msg = require('dialog');
const QnA = require('../schema/QnA');
const Campground = require('../schema/Campground');


// Q&A 작성 및 수정 화면
var camp_id = null;
var qna_id = null;
router.get('/setqna', function(req, res) {

    //로그인 안했으면 퇴출
    if(!req.session.email){
        res.redirect('/login');
    }else{       
        camp_id = req.query.camp_id;  
        if(camp_id == null){
            qna_id = req.query.id;
            QnA.findOne({_id : `${qna_id}`}, (result) => {
                var camp = result.Campground_id;
                Campground.findOne({_id :`${camp}` },(result) => {
                    res.render('write_and_modify_QnA', {name: `${result.Campground_name}`});
                });       
            });
        }else{
            Campground.findOne( {_id :`${camp_id}`}, (err, campResult) => {
                if(err) { console.log(err);}
        
                var camp_name = campResult.Campground_name;
                res.render('write_and_modify_QnA', {name: `${camp_name}`});
            });
        }     
    }
    
});

router.post('/setqna', function(req, res) {

    var email = req.session.email;
    var date = new Date(); //현재시각
    var check = false; //기본값 false
    var write_content = req.body.description;
    var comment_content = null;
    var campId = camp_id;

    //camp_id가 존재하면 작성
    if(camp_id != null){  
        var qna = new QnA({
            Campground_id : campId,
            Writer_email : email,
            Writing_date : date,
            Public_check : check,
            Writing_content : write_content,
            Comment_content : comment_content
        });
        qna.save()
            .then((result)=>{
                msg.info("QnA 작성 성공");
                console.log("QnA save to database successed");
                res.redirect('/main');
            })
            .catch((err) => {
                msg.info('QnA 작성 실패');
                console.log(err);
                res.redirect('/main');
            });    
    }else{
        //camp_id가 존재하지 않으면 수정, 자기가 쓴 경우에만 수정 가능하게
        QnA.updateMany({_id : qna_id}, {$set: {
            Writing_date : date,
            Writing_content : write_content
        }})
        .then((result) => {
            msg.info('QnA 수정 완료');
            res.redirect('/main');
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            });
        });
    }
});

//QnA 삭제
router.get('/deleteQna', function(req,res){
 
    //본인과 관리자만 삭제 가능하게!
    var qna_email;
    var qna_Id = req.query.id;
    
    QnA.findOne({_id : `${qna_Id}` })
    .then((resultQna) => {
        qna_email = resultQna.Writer_email;

        if((req.session.email == qna_email || req.session.mode == 3)){
            QnA.remove({_id : `${qna_Id}`}, (err)=>{
                if(err){
                    msg.info("qna 삭제 실패");
                    res.redirect('/main');
                }else{
                    msg.info("qna 삭제 성공");
                    res.redirect('/main');
                }
            })
        }else{
            msg.info("접근 가능한 권한이 없습니다.");
            res.redirect('/main');
        }
    })

});

//답변 작성 후 출력
router.post('/setanswer', function(req,res){
    var answer = req.body.answer;  
    
    QnA.findByIdAndUpdate({_id : qna_id}, {Comment_content : answer}, (err,result)=>{
        if(err){ console.log(err);}
        console.log('database success');
        res.redirect('/main');
    });
   
});

module.exports = router;