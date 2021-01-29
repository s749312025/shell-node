if (!localStorage.token) {
    location.href = '/login.html'
}

const request = function(option) {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        ...option,
    });
}
