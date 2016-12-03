# -*- coding: utf-8 -*-
from flask import Flask, session, render_template, request, url_for, redirect
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
# 为了生成动态密钥
import os
# 仅供调试使用，禁止生成pyc文件
import sys
sys.dont_write_bytecode = True

# 初始化
app = Flask(__name__)
app.secret_key = os.urandom(24)
socketio = SocketIO(app)

login_manager = LoginManager()
login_manager.init_app(app)

# 定义User类，以便login_manager管理
class User(UserMixin):
    pass

# 从session把用户信息载入到到login_manager
@login_manager.user_loader
def load_user(username):
    user = User()
    user.id = username
    return user

@login_manager.request_loader
def request_loader(request):
    user = User()
    user.id = request.form.get('username')
    return user

# 首页和输入用户名后登陆
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and request.form['username'] != None:
        # session['user'] = request.form['username']
        login_user(load_user(request.form['username']))

    return render_template('index.html')

# 调试指令，查询是否登陆成功
@app.route('/login')
def login():
    if current_user.id:
        return current_user.id

    return 'Not logged in!'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    # session.pop('user', None)

    return redirect(url_for('index'))

# socketIO部分的代码
# 0. 连接
@socketio.on('connect')
def connect_handler():
    if current_user.is_authenticated:
        emit('my response',
             {'name': current_user.id},
             broadcast=True)
        # print the session ID
        print request.sid
    else:
        return False

# 2. 接收客户端传来的name
@socketio.on('my name')
def regist(name):
    emit('response name', {'data': name['data']})

# 5. 接收客户端传来的message
@socketio.on('message')
def handle_message(msg):
    print('Message: ' + msg)
    final = '{0}: '.format(current_user.id) + msg
    send(final, broadcast=True)

# 加入房间
@socketio.on('enter room')
def enter_room(message):
    join_room(message['room'])

if __name__ == '__main__':
    socketio.run(app)
