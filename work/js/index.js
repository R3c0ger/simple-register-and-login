// 检查浏览器是否支持 localStorage
if (typeof(Storage) === 'undefined') {
  alert('对不起，您的浏览器不支持 Web Storage...')
}

// 区分登录界面和注册界面
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (loginForm) {
  // 处理登录表单的提交
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    // 获取用户类型
    const switchBtn = document.getElementById('switchBtn');
    const userType = switchBtn.checked ? '用户' : '商家';

    var user = localStorage.getItem(username);
    if (user && JSON.parse(user).password === password) {
      alert(userType + '登录成功！');
      if (userType === '商家') {
        window.location.href = "html/home.html";
      } else {
        window.location.href = "html/home2.html";
      }
    } else {
      alert('用户名或密码错误！');
    }
  });
} else if (registerForm) {
  // 处理注册表单的提交
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;
    var phone = document.getElementById('register-phone').value;
    var email = document.getElementById('register-email').value;
    var place = document.getElementById('register-place').value;

    // 获取用户类型
    const switchBtn = document.getElementById('switchBtn');
    const userType = switchBtn.checked ? '用户' : '商家';

    // 检查用户名和密码是否为空、用户名是否已存在
    if (username === "" || password === "") {
      alert("请输入用户名和密码！");
    } else if (localStorage.getItem(username)) {
      alert('用户名已存在！');
    } else {
      // 保存用户信息
      var user = JSON.stringify({
        username: username,
        password: password,
        userType: userType,
        phone: phone,
        email: email,
        place: place
      });
      localStorage.setItem(username, user);
      alert('注册成功！');
    }
  });
}