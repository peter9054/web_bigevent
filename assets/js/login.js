$(function(){
    //点击“去注册的账号”链接
$('#link_reg').on('click',function(){
  $('.login-box').hide()
  $('.reg-box').show()
})
$('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
})
//从layui中获取form对象
var form = layui.form
var layer = layui.layer
// 通过form.verify()函数自定义效验规则
form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6~12位，且不能出现空格'],
//校验两次密码是否一致的规则
   repwd:function(value){
       //通过形参拿到的是确认密码框中的内容
       //还需要拿到密码框中的内容
       //然后进行一次等于的判断
       //如果判断失败，则return一个提示消息
      var pwd = $('.reg-box [name=password]').val()
       if(pwd != value){
           return '两次密码不一致'
       }
   }
})
//监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
  e.preventDefault()
  var data= {username:$('#form_reg[name=username]').val(),password:$('#form_reg[name=password]').val()}
  $.post('http://www.liulongbin.top:3007/api/reguser',data,function(res){
  if(res.status !== 0){
      return layer.msg(res.message)
  }
  console.log('注册成功');
  layer.msg('注册成功啦')
  //模拟人为的点击事件
  $('#link_login').click()
  
  })
})
//监听登陆表单的提交事件
$('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        url:'http://www.liulongbin.top:3007/api/login',
        method:'POST',
        //快速获取表单的数据
        data:$(this).serialize(),
        success:function(res){
         if(res.status !== 0){
             return layer.msg('登陆失败')
         }
         layer.msg('登陆成功')
         console.log(res.token);
        //  将登陆成功得到的token字符串，保存到localStorage中
        localStorage.setItem('token',res.token)
         //跳转到后台主页
         location.href = '/index.html'
        }
    })
})


})