# -*- coding: utf-8 -*-
import eventlet
eventlet.monkey_patch()
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

# 开启背景线程，用以持续发送用户名
def background_thread(user):
    while True:
        socketio.sleep(5)
        socketio.emit('update_list', {'data': user}, broadcast=True)


# 首页和输入用户名后登陆
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and request.form['username'] != None:
        session['user'] = request.form['username']

    return render_template('index.html')


# socketio事件
@socketio.on('connect')
def user_connect():
    if 'user' in session:
        session['thread'] = socketio.start_background_task(target=background_thread, user=session['user'])
        emit('update_list', {'data': session['user']}, broadcast=True)
        print 'The username is: ' + session['user']
        # session['room'] = request.sid
        rooms_list.append(request.sid)
        print '----------rooms list-----------'
        print rooms_list
        print '-------------------------------'
    else:
        print 'No user now.'
    print 'The sid is: ' + request.sid
    print '-------------------------------'
    print 'Namespace is: '
    print request.namespace

# 下线
@socketio.on('disconnect')
def user_disconnect():
    if 'user' in session:
        session.pop('thread', None)
        rooms_list.remove(request.sid)
        print '----------rooms list-----------'
        print rooms_list
        print '-------------------------------'
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S") + ' - Client disconnected')

# 5. 处理客户端传来的message
@socketio.on('message')
def handle_message(msg):
    print('Message: ' + msg)


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
    socketio.run(app, debug=True)
