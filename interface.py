from flask import Flask, request, abort, Response
import os
import time
import flask_cors
import sqlite3
import pymysql
import datetime
import json
import hashlib

app = Flask(__name__)
db = pymysql.connect(host='192.168.1.101', user='root', password='123456', database='mytest', charset='utf8')
db.autocommit(True)
use = db.cursor()

flask_cors.CORS(app, resources=r'/*')


@app.route('/')
def access():
    registered_html = open('registered.html', encoding='utf-8').read()
    open('registered.js', encoding='utf-8').read()
    open('registered.css', encoding='utf-8').read()
    return registered_html


@app.route('/registered', methods=["get", "post"])
def registered():
    now = datetime.datetime.now().strftime('%Y-%m-%d')
    text = dict(request.form)
    users = []
    username = text['username']
    password = text['password']
    # md5
    en = hashlib.md5()
    en.update(password.encode('utf8'))
    password = en.hexdigest()
    email = text['email']
    phone = text['phone']
    # sex = text['sex']
    # birthday = text['birthday']
    location = text['location']
    # if birthday == '' or birthday == 'NULL':
    #     birthday = 'NULL'
    # else:
    #     birthday = "'%s'" % birthday
    use.execute("select user_name from users;")
    user_all = use.fetchall()
    for i in user_all:
        users.append(i[0])
    if username in users:
        result = [{'statu': 1, 'message': '已存在此用户！'}]
        result = json.dumps(result)
        return result
    else:
        try:
            use.execute(
                "INSERT INTO users (user_name,user_password,create_time,email,phone,address) VALUES ('%s','%s','%s','%s','%s','%s')" %
                (username, password, now, email, phone, location))
        except:
            result = [{'statu': 500, 'message': 'Sever error!'}]
            result = json.dumps(result)
            return result
        # html = open('login.html', encoding='utf-8')
        # html_text = html.read()
        # resp = Response('注册成功！')
        # abort(resp)
        message = '注册成功！'
        result = [{'statu': 0, 'message': message}]
        result = json.dumps(result)
        return result


@app.route("/login", methods=["get", "post"])
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    # print(request.args)
    # md5
    en = hashlib.md5()
    en.update(password.encode('utf8'))
    password = en.hexdigest()
    # print(username,password)
    use.execute("select user_name,user_password from users;")
    mytext = use.fetchall()
    # print(mytext)
    mytext_dict = dict(mytext)
    # print(mytext_dict)
    users = []
    pwd = []
    for i in range(len(mytext)):
        users.append(mytext[i][0])
        pwd.append(mytext[i][1])
    # print(users)
    # print(pwd)
    if username not in users:
        message = '该用户不存在'
        result = [{'statu': 2, 'message': message}]
        result = json.dumps(result)
        # print(result)
        return result
    else:
        if password == mytext_dict[username]:
            token_message = username + password + str(int(time.time()))
            token_message = en.update(token_message.encode('utf8'))
            token = en.hexdigest()
            # print(token)
            use.execute("update users set token = '%s' where user_name = '%s';" % (token, username))
            result = [{'statu': 200, 'message': '登陆成功', 'token': token}]
            result = json.dumps(result)
            return result
        elif password != mytext_dict[username]:
            result = [{'statu': 1, 'message': '密码错误'}]
            result = json.dumps(result)
            return result


@app.route("/token_check", methods=["post", "get"])
def token_check():
    token = request.form.get("token")
    username = request.form.get("username")
    use.execute("select token from users where user_name = '%s';" % username)
    token_check = use.fetchall()
    # print(token_check,'\n',token)
    if len(token_check) != 0:
        if token == token_check[0][0]:
            return json.dumps([{'statu': 200, 'message': '登陆成功'}])
        else:
            return json.dumps([{'statu': 5, 'message': '用户未登录'}])
    else:
        return json.dumps([{'statu': 5, 'message': '用户未登录'}])

@app.route('/select', methods=['get'])
def select():
    # username = request.form.get('username')
    username = request.args.get('username')
    print(username)
    username = str(username)
    sql = "select * from users where user_name = '%s';" % username
    # print(sql)
    use.execute(sql)
    result = use.fetchall()
    result = tuple(result)
    # print(result[0])
    result1 = ''
    for j in range(len(result)):
        a = ''
        # print(result[j])
        for i in result[j]:
            i = str(i)
            a = a + i + '   '
        result1 = result1 + "用户" + str(int(j) + 1) + "数据：" + a + '<br>'
    print(result1)
    return result1


if __name__ == '__main__':
    app.run(debug=True, host='192.168.1.101')
