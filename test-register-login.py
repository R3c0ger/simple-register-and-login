# -*- coding: utf-8 -*-
from time import sleep

import helium
import pytest
from faker import Faker
from helium import *


# 这里写整个项目的绝对路径，需手动更改
Prefix = "file:///E:/笔记和资料/01_系统设计/实验/实验3"
LoginPage = Prefix + "/work/index.html"
RegisterPage = Prefix + "/work/registar.html"

def generate_random_account():
    """生成随机的用户名、密码、电话、邮箱、地点，以及一个值代表是商家还是用户"""
    fake = Faker()
    username = fake.user_name()
    password = fake.password()
    phone = fake.phone_number()
    email = fake.email()
    location = fake.location_on_land()
    is_seller = fake.boolean()
    return username, password, phone, email, location, is_seller

class TestRegister:
    def test_register_success(self,
            no_test=False,
            lack_username=False,
            lack_password=False
            ):
        browser = helium.start_firefox(RegisterPage)
        account_info = generate_random_account()
        print(account_info)
        for i in range(5):
            press(TAB)
            if i == 0 and lack_username:
                continue
            if i == 1 and lack_password:
                continue
            write(account_info[i])
        for i in range(2):
            press(TAB)
        if account_info[5]:
            press(SPACE)
        click("Register")
        if no_test:
            return account_info
        if lack_username or lack_password:
            assert Text("请输入用户名和密码！").exists()
            return account_info
        assert Text("注册成功！").exists()

    def test_register_lack_username(self):
        self.test_register_success(lack_username=True)

    def test_register_lack_password(self):
        self.test_register_success(lack_password=True)

    def test_register_lack_username_and_password(self):
        self.test_register_success(lack_username=True, lack_password=True)

    def test_register_repeat_username(self):
        account_info = self.test_register_success(no_test=True)
        write(account_info[0], into="Username:")
        account_info_2 = generate_random_account()
        for i in range(1, 5):
            press(TAB)
            write(account_info_2[i])
        for i in range(2):
            press(TAB)
        if account_info_2[5]:
            press(SPACE)
        click("Register")
        assert Text("用户名已存在！").exists()

class TestLogin:
    @staticmethod
    def _pre_register():
        # 测试登录前先注册一个账号
        test_register = TestRegister()
        account_info = test_register.test_register_success(no_test=True)
        print(account_info)
        return account_info

    def test_login_success(self,
            lack_username=False,
            wrong_username=False,
            lack_password=False,
            wrong_password=False,
            wrong_status=False,
        ):
        # 先注册，保留已注册的账号信息
        account_info = self._pre_register()
        account_info_wrong = list(generate_random_account())
        # 返回登录界面
        for i in range(2):
            press(TAB)
        press(ENTER)

        # 输入用户名
        press(TAB)
        if lack_username: pass
        elif wrong_username:
            write(account_info_wrong[0])
        else:
            write(account_info[0])
        # 输入密码
        press(TAB)
        if lack_password: pass
        elif wrong_password:
            write(account_info_wrong[1])
        else:
            write(account_info[1])

        # 选择身份
        for i in range(2):
            press(TAB)
        if wrong_status:
            account_info_wrong[5] = ~account_info[5]
        else:
            account_info_wrong[5] = account_info[5]
        if account_info_wrong[5]:
            press(SPACE)
        click("Login")
        if lack_password or lack_username or wrong_username or wrong_password:
            assert Text("用户名或密码错误！").exists()
            return account_info
        if wrong_status:
            assert Text("用户身份错误！").exists()
            return account_info
        assert Text("登录成功！").exists()

    def test_login_lack_username(self):
        self.test_login_success(lack_username=True)

    def test_login_wrong_password(self):
        self.test_login_success(wrong_password=True)

    def test_login_wrong_status(self):
        self.test_login_success(wrong_status=True)

if __name__ == "__main__":
    pytest.main()