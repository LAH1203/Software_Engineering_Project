function setInformation(info) {
    let x = document.getElementsByClassName("quiz-text")[0];
    x.innerText=info; 
}
function setQnA(qna) {
    let x = document.getElementsByClassName("quiz-text")[0];
    x.innerText=qna; 
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