function goToCampgroundPage(camp_id) {
    let link = 'http://localhost:3000/camp?camp_id=' + camp_id;
    console.log(link);
    location.href = link;
}
