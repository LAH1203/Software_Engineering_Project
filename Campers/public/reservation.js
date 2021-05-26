var startDay, endDay, totalDay, people, price;

function calculateDay() {
    startDay = document.getElementById('startDay').value;
    endDay = document.getElementById('endDay').value;
    totalDay = document.getElementById('totalDay');
    
    var arg1 = startDay.split('-');
    var arg2 = endDay.split('-');
    
    var sd = new Date(arg1[0], arg1[1], arg1[2]);
    var ed = new Date(arg2[0], arg2[1], arg2[2]);
    var dif = ed - sd;
    
    // 입실 날짜와 퇴실 날짜가 모두 입력되었을 때만 내용 넣음
    if (startDay && endDay)
        totalDay.value = dif / (24 * 60 * 60 * 1000);
}

function calculatePrice() {
    price = document.getElementById('price');
    // 임시로 금액 계산은 1박당 3만원, 1인에 1만원으로 하겠습니당
    totalDay = document.getElementById('totalDay').value;
    people = document.getElementById('people').value;
    if (totalDay && people)
        price.value = parseInt(totalDay) * 30000 + parseInt(people) * 10000;
}