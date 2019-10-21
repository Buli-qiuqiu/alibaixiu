// 提交表单信息时
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    // console.log(formData);
    // 提交表单
    $.ajax({
        type: 'post',
        url: '/users',
        // 数据为字符串格式,直接上传
        data: formData,
        success: function (response) {
            // 刷新
            location.reload();
        },
        error: function (response) {
            console.log(response);
        }
    })
    // 组织表单自动提交
    return false;
});


// 提交图片头像
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    // console.log(formData);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#newpic').attr('src', response[0].avatar);
            $('#hiddenpic').val(response[0].avatar);
        },
    })
});

// 将用户数据展示在列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response);
        var html = template('userTpl', {
            data: response
        });
        $('#userBox').html(html);
    }
});


// 点击编辑按钮获取对应id
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data_id');
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', response);
            // console.log(html);
            $('#modifyBox').html(html);
        }
    })
});

// 将修改后的用户提交至展示列表
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    console.log(formData);
    // var id = $('#modifyForm').attr('data_id');
    var id = $(this).attr('data_id');
    console.log(id);
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            console.log(response);
            location.reload();
        },
        error: function (response) {
            console.log(response);
        }
    })
    // 组织表单自动提交
    return false;
})