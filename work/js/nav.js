const navBar = `
<nav>
<ul class="nav-links" style="padding-top: 15px;">
    <li><a href="home.html">主页</a></li>
    <li><a href="personMsgDisplay.html">个人信息展示</a></li>
    <li><a href="volunteerActivite.html">志愿活动功能</a></li>
    <li><a href=volunteerApply.html#">志愿活动报名管理</a></li>
    <li><a href="commodityManager.html">商品管理功能</a></li>
    <li><a href="indentQuery.html">商品订单查看</a></li>
    <li><a href="donateList.html">捐赠名单管理</a></li>
</ul>
<div class="burger">
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
</div>
</nav>
`;

document.body.insertAdjacentHTML('afterbegin', navBar);