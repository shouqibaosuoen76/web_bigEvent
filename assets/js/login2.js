$(function () {
// 点击注册账号的链接
$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})

// 点击去登陆的链接
$('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})

// 从layui中获取form对象
const form = layui.form
const layer = layui.layer
// 通过form.verify(obj)方法来自定义验证规则
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格'],
    // 检验两次输入的密码是否一致
    repwd: function (value) {
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== repwd) {
            return '两次密码不一致'
        }
    }
})

// 监听注册表单的提交事件
$('#form_reg').on('sumbit', function (e) {
   e.preventDefault()
   var data = {
               username: $('#form_reg [name=username]').val(), 
               password: $('#form_reg [name=password]').val()
    }
   $.post('/api/reguser',data, function (res) {
    if (res.status !== 0) {
        return layer.msg(res.message)
    }
    layer.msg('注册成功，请登录！')
    // 模拟人的点击行为
    $('#link_login').click()
   })
})

//  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
}) 