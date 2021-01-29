
if (localStorage.shName) {
    $('.user').html(localStorage.shName)
}

$('.logout').on('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('shName')

    location.href = '/login.html'
})