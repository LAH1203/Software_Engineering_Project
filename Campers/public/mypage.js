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