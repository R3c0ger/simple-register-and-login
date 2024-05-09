// 检查浏览器是否支持 localStorage
if (typeof(Storage) === 'undefined') {
  alert('对不起，您的浏览器不支持 Web Storage...')
}

// 获取用户身份
function getUserStatus() {
  const switchBtn = document.getElementById('switchBtn');
  const userStatus = switchBtn.checked ? 'user' : 'merchant';
  return userStatus;
}

// 用户类
class User {
  constructor(username, password, userStatus, phone='', email='', place='') {
    this.username = username;
    this.password = btoa(password);
    this.userStatus = userStatus;
    this.phone = phone;
    this.email = email;
    this.place = place;
  }
}

// 检测是登录界面还是注册界面
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// 处理登录表单的提交
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    var userStatus = getUserStatus();

    const loginError = document.getElementById('login-error');
    // 检查用户名和密码是否匹配
    var user = localStorage.getItem(username);
    if (user && atob(JSON.parse(user).password) === password) {
      // 检查用户身份是否匹配 
      if (JSON.parse(user).userStatus === userStatus) {
        const dest = userStatus === 'merchant' ? 'html/home.html' : 'html/home2.html';
        // 提示登录成功，并自动跳转
        loginError.textContent = "";
        var div = document.createElement('div');
        div.textContent = '登录成功！ 3秒后跳转至导航...';
        div.className = 'alert-success';
        div.appendChild(document.createElement('a'));
        div.children[0].textContent = '点此直接跳转';
        div.children[0].setAttribute('href', dest);
        div.children[0].style.marginLeft = '15px';
        document.body.appendChild(div);
        setTimeout(function() {
          window.location.href = dest;
        }, 3000);
      }
      else {
        loginError.textContent = "用户身份错误！";
      }
    } else {
      loginError.textContent = "用户名或密码错误！";
    }
  });
}

// 处理注册表单的提交
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;
    var phone = document.getElementById('register-phone').value;
    var email = document.getElementById('register-email').value;
    var place = document.getElementById('register-place').value;
    var userStatus = getUserStatus();

    const registerError = document.getElementById('register-error');
    // 检查用户名和密码是否为空
    if (username === "" || password === "") {
      registerError.textContent = "请输入用户名和密码！";
      return
    }
    // 检查用户名是否已存在
    if (localStorage.getItem(username)) {
      registerError.textContent = "用户名已存在！";
      return
    }

    // 保存用户信息
    var user = JSON.stringify(
      new User(username, password, userStatus, phone, email, place)
    );
    localStorage.setItem(username, user);

    // 提示注册成功
    registerError.textContent = "";
    var div = document.createElement('div');
    div.textContent = '注册成功！';
    div.className = 'alert-success';
    document.body.appendChild(div);
    setTimeout(function() {
      document.body.removeChild(div);
    }, 5000);
  });
}