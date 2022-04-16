$(function() {
    //调用getUserInfo() //获取用户的基本信息
    getUserInfo()



    // 点击退出按钮
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('请问是否退出', { icon: 3, title: '提示' }, function(index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
                // 重新跳转到登录页面
            location.href = "/login.html"


            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // header就是请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar渲染头像
            renderAvatar(res.data)
        },
        //不论成功还是失败，都会调用complete 回调函数----已经在API文件里
        // complete: function(res) {
        //     // console.log('执行了complete回调：');
        //     // console.log(res);
        //     // 在complete 回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //             // 强制跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
        // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
            // 把名字的第一个中文或者英文（ 改为大写） 显示出来
            // toUpperCase 把英文改为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}