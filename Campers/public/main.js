function goToCampgroundPage(camp_id) {
    let link = 'http://localhost:3000/camp?camp_id=' + camp_id;
    console.log(link);
    location.href = link;
}

function calculateStar() {
    var averageStar;
    var starPoint = document.getElementById('starPoint');

    var sum=0;
    for (var i=0; i<starPoint.length; i++) {
        sum += starPoint[i];
    }
    
    averageStar = sum/starPoint.length
}