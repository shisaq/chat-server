# -*- coding: utf-8 -*-
from flask import Flask, session, render_template, request, url_for, redirect
from flask_socketio import SocketIO, send, emit, join_room, leave_room, rooms
from datetime import datetime
# 为了生成动态密钥
import os
# 仅供调试使用，禁止生成pyc文件
import sys
sys.dont_write_bytecode = True

# 初始化
async_mode = 'eventlet'

app = Flask(__name__)
app.secret_key = os.urandom(24)
socketio = SocketIO(app, async_mode=async_mode)


# 房间们
rooms_list = []


# 首页和输入用户名后登陆
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and request.form['username'] != None:
        session['user'] = request.form['username']

    return render_template('index.html', async_mode=socketio.async_mode)


# socketio事件
@socketio.on('connect')
def user_connect():
    print 'The room ID is: ' + rooms()[0]
    if 'user' in session:
        print 'The username is: ' + session['user']
        # session['room'] = request.sid
        rooms_list.append(request.sid)
        print '----------rooms list-----------'
        print rooms_list
        print '-------------------------------'
    else:
        print 'No user now.'
    print 'The sid is: ' + request.sid

# 下线
@socketio.on('disconnect')
def user_disconnect():
    if 'user' in session:
        rooms_list.remove(request.sid)
        print '----------rooms list-----------'
        print rooms_list
        print '-------------------------------'
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S") + ' - Client disconnected')

# 5. 处理客户端传来的message
@socketio.on('message')
def handle_message(msg):
    if session.get('user'):
        print('Message: ' + msg)
        final = '{0}'.format(session.get('user')) + ': ' + msg
        send(final, broadcast=True)


# 调试指令，查询是否登陆成功
@app.route('/login')
def login():
    if session.get('user'):
        return session.get('user')

    return 'Not logged in!'

@app.route('/logout')
def logout():
    session.pop('user', None)

    return redirect(url_for('index'))

# 启动
if __name__ == '__main__':
    socketio.run(app)
