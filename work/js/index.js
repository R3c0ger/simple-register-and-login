// 检查浏览器是否支持 localStorage
if (typeof(Storage) === 'undefined') {
    alert('对不起，您的浏览器不支持 Web Storage...')
  }
  
  // 处理登录表单的提交
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
  
    var user = localStorage.getItem(username);
    if (user && JSON.parse(user).password === password) {
      alert('登录成功！');
    } else {
      alert('用户名或密码错误！');
    }
  });
  
  // 处理注册表单的提交
  document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;
  
    var user = JSON.stringify({
      username: username,
      password: password
    });
    localStorage.setItem(username, user);
    alert('注册成功！');
  });
  