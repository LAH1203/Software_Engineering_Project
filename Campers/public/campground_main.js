/*
function goTowamQnAPage(id) {
    var url = 'http://localhost:3000/setqna';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}
*/

const Review = require("../schema/review");

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
        var div = document.createElement("div");
        div.innerHTML = qnatext[i]+modifybtn.outerHTML+deletebtn.outerHTML;
        x.appendChild(div);
    }
}

function setReview(arr, review_id) {
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

    deletebtn.onclick=function() { 
        delete_review(review_id);
    };
    
    
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
        
        
        div.innerHTML = reviewtext[i]+stars[i]+reviewtext.length;
        x.appendChild(div);
        //x.appendChild(reviewtext[i]);
        //x.appendChild(stars[i]);
        x.appendChild(modifybtn);
        x.appendChild(deletebtn);
    }

    
    
    //deletebtn.addEventListener('input', updateValue);
    
    
    
    
}

// 예약 화면으로 가는 함수
function goToReservationPage(id) {
    var url = 'http://localhost:3000/reservation';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}


function delete_review(review_id) {
    if (confirm('삭제하시겠습니까?')) {
        var url = 'http://localhost:3000/deleteReview';
        var queryParams = '?id=' + review_id;
        var link = url + queryParams;
        location.href = link;
        console.log(link);
    } else {
        return;
    }
}
