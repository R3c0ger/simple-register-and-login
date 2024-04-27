const navBar = `
<nav>
    <ul class="nav-links">
    <li><a href="home2.html">主页</a></li>
        <li><a href="user-personMsgDisplay.html">个人信息展示</a></li>
        <li><a href="user-volunteerApply.html">志愿活动功能</a></li>
        <li><a href="user-buy.html">商品查看</a></li>
        <li><a href="user-lookCommodity.html">商品订单查看</a></li>
        <li><a href="user-donate.html">捐赠管理</a></li>
    </ul>
    <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    </div>
</nav>
`;

document.body.insertAdjacentHTML('afterbegin', navBar);