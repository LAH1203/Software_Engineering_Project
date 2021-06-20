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
    deletebtn.onclick=function() { 
        if (confirm('삭제하시겠습니까?')) {
            var url = 'http://localhost:3000/deleteReservation';
            var queryParams = '?id=' + review_id;
            var link = url + queryParams;
            location.href = link;
            console.log(link);
        } else {
            return;
        }
    };
    /*
    deletebtn.addEventListener('input', updateValue);
    deletebtn.onclick = function() {
        if (confirm('삭제하시겠습니까?')) {
            var url = 'http://localhost:3000/deleteReservation';
            var queryParams = '?id=' + review_id;
            var link = url + queryParams;
            location.href = link;
            console.log(link);
        } else {
            return;
        }
    }
    */
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
        /*
        div.innerHTML = reviewtext[i]+stars[i]+modifybtn.outerHTML+deletebtn.outerHTML;
        x.appendChild(div);
        */
        div.innerHTML = reviewtext[i]+stars[i];
        x.appendChild(div);
        x.appendChild(modifybtn);
        x.appendChild(deletebtn);
    }
}

// 예약 화면으로 가는 함수
function goToReservationPage(id) {
    var url = 'http://localhost:3000/reservation';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}

/*
function delete_review(review_id) {
    if (confirm('삭제하시겠습니까?')) {
        var url = 'http://localhost:3000/deleteReservation';
        var queryParams = '?id=' + review_id;
        var link = url + queryParams;
        location.href = link;
        console.log(link);
    } else {
        return;
    }
}
*/