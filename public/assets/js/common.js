$('#loginout').on('click', function () {
    const isConfirm = confirm("是否退出登录");
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html'
            },
            error: function () {
                alert("退出失败")
            }
        })
    }
});