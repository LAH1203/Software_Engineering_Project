var express = require('express');
var router = express.Router();
var msg = require('dialog');
const QnA = require('../schema/QnA');

// Q&A 작성 및 수정 화면
router.get('/setqna', function(req, res) {
    var id = req.query.id;
    res.render('write_and_modify_QnA', {id: `${id}`});
});

router.post('/setqna', function(req, res) {
    // 여기에서 body-parser를 사용해서 qna 정보를 받아와주세요
    // id를 쿼리로 전달하는 것보다 이게 나을 것 같아서 이 방법을 사용하였습니다.

});

module.exports = router;