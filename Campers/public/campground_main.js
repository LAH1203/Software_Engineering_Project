function changeByJS() {
    let x = document.getElementsByClassName("quiz-text")[0];
    x.innerText="Javascript"; 
}
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

/*
function setInformation(information) {
    //var a = document.getElementById('bottom');
    document.write(information);
}
function setQnA(QnA) {
    //var b = document.getElementById('bottom');
    document.write(QnA);
}
function setReview(Review) {
    //var c = document.getElementById('bottom');
    document.write(Review);
}

function setInformation() {
    '${bottom}'= "camp_information"
    //location.href = link;
}

function setQnA() {
    bottom= "camp_QnA"
    //location.href = link;
}

function setReview() {
    bottom= "camp_review"
    //location.href = link;
}

document.getElementById("information").onclick =function() {
    document.bgColor ="white";
}
document.getElementById("QnA").onclick =function() {
    document.bgColor ="#00ff00";
}
document.getElementById("Review").onclick =function() {
    document.bgColor ="rgb(100%, 0%, 0%)";
}
*/  
