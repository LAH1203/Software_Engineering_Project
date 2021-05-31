//Q&A 작성화면으로 가는 함수
function goTowamQnAPage(id) {
    var url = 'http://localhost:3000/setqna';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}

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
    var qnatext = document.createElement("text");
    qnatext.innerText = qna;
    x.appendChild(qnatext);
    //x.innerText += input(type="button", value='작성하기', onclick="goTowamQnAPage(pageid)");
}

function setReview(rev) {
    let x = document.getElementsByClassName("quiz-text")[0];
    x.innerText=rev;
}

// 예약 화면으로 가는 함수
function goToReservationPage(id) {
    var url = 'http://localhost:3000/reservation';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}