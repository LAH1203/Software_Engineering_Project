function goToCampgroundPage(camp_id) {
    let link = 'http://localhost:3000/camp?camp_id=' + camp_id;
    console.log(link);
    location.href = link;
}
function approval_reservation(_id) {
    if (confirm('승인하시겠습니까?')) {
        var url = 'http://localhost:3000/approvalReservation';
        var queryParams = '?id=' + _id;
        var link = url + queryParams;
        location.href = link;
    } else {
        return;
    }
}

function delete_reservation(_id) {
    if (confirm('취소하시겠습니까?')) {
        var url = 'http://localhost:3000/deleteReservation';
        var queryParams = '?id=' + _id;
        var link = url + queryParams;
        location.href = link;
    } else {
        return;
    }
}

function checkin_reservation(_id) {
    if (confirm('체크인하시겠습니까?')) {
        var url = 'http://localhost:3000/checkinReservation';
        var queryParams = '?id=' + id;
        var link = url + queryParams;
        location.href = link;
    } else {
        return;
    }
}

function delete_user_info(email) {
    if (confirm('탈퇴하시겠습니까?')) {
        var url = 'http://localhost:3000/deleteUserInfo';
        var queryParams = '?email=' + email;
        var link = url + queryParams;
        location.href = link;
    } else {
        return;
    }
}

function modify_campground_info(id) {
    var url = 'http://localhost:3000/setcampinfo';
    var queryParams = '?id=' + id;
    var link = url + queryParams;
    location.href = link;
}

function delete_campground_info(id) {
    if (confirm('삭제하시겠습니까?')) {
        var url = 'http://localhost:3000/deletecampinfo';
        var queryParams = '?id=' + id;
        var link = url + queryParams;
        location.href = link;
    } else {
        return;
    }
}