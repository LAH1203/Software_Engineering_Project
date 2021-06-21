/*
function goTowamQnAPage(id) {
    var url = 'http://localhost:3000/setqna';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}
*/

function setInformation(info) {
    let x = document.getElementsByClassName("quiz-text")[0];
    x.innerText=info; 
}

function setQnA(id, qna) {
    let x = document.getElementsByClassName("quiz-text")[0];
    x.innerText='';
    var btn = document.createElement("button");
    btn.innerText = "질문작성";
    btn.onclick = function() {
        var url = 'http://localhost:3000/setqna';
        var queryParams = '?id=' + id;
        var link = url + queryParams;
        location.href = link;
    }
    //btn.setAttribute("onclick","goTowamQnAPage(id)");
    x.appendChild(btn);
    var qnatext = (qna.split(','));

    var modifybtn = document.createElement('input');  
    modifybtn.type = 'button';
    modifybtn.value = '수정';
    
    var deletebtn = document.createElement('input');  
    deletebtn.type = 'button';
    deletebtn.value = '삭제';

    for (var i=0; i<qnatext.length; i++) {
        modifybtn.id = i;
        deletebtn.id = i;
        var div = document.createElement("div");
        div.innerHTML = qnatext[i]+modifybtn.outerHTML+deletebtn.outerHTML;
        x.appendChild(div);
    }
}

function setReview(arr) {
    let x = document.getElementsByClassName("quiz-text")[0];
    x.innerText='';
    var stars = (arr.split('---')[0]).split(',');
    var reviewtext = (arr.split('---')[1]).split(',');
    
    var modifybtn = document.createElement('input');  
    modifybtn.type = 'button';
    modifybtn.value = '수정';
    
    var deletebtn = document.createElement('input');  
    deletebtn.type = 'button';
    deletebtn.value = '삭제';
    //btn.id="id_"+n;

    //btn.appendChild(btnText);             
    /*  
    btn.onclick = function() { 
        var url = 'http://localhost:3000/setreview';
        //var queryParams = '?id=' + id;
        //var link = url + queryParams;
        var link = url;
        location.href = link;
    };
    */

    for (var i=0; i<reviewtext.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = reviewtext[i]+stars[i]+modifybtn.outerHTML+deletebtn.outerHTML;
        x.appendChild(div);
    }
}

// 예약 화면으로 가는 함수
function goToReservationPage(id) {
    var url = 'http://localhost:3000/reservation';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}

function c1(id) {
    let link = 'http://localhost:3000/camp?camp_id=' + id + '&check=' + 0;
    location.href = link;
}
function c2(id) {
    let link = 'http://localhost:3000/camp?camp_id=' + id + '&check=' + 1;
    location.href = link;
}
function c3(id) {
    let link = 'http://localhost:3000/camp?camp_id=' + id + '&check=' + 2;
    location.href = link;
}

function modifyQnA(id) {
    let link = 'http://localhost:3000/setqna?id=' + id;
    location.href = link;
}
function deleteQnA(id) {
    let link = 'http://localhost:3000/deleteqna?id=' + id;
    location.href = link;
}
function modifyReview(id) {
    let link = 'http://localhost:3000/setreview?id=' + id;
    location.href = link;
}
function deleteReview(id) {
    let link = 'http://localhost:3000/deletereview?id=' + id;
    location.href = link;
}