# -*- coding: utf-8 -*-
import eventlet
eventlet.monkey_patch()
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room, rooms
from datetime import datetime
# to generate a random secret key
import os
# refresh pyc everytime I change code
import sys
sys.dont_write_bytecode = True

# init
async_mode = 'eventlet'

app = Flask(__name__)
app.secret_key = os.urandom(24)
socketio = SocketIO(app, async_mode=async_mode)


# index
@app.route('/')
def index():
    return render_template('index.html')


# socketio events
# on connect
@socketio.on('connect')
def user_connect():
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S") + ' - Server connected successfully.')

# offline
@socketio.on('disconnect')
def user_disconnect():
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S") + ' - Client disconnected.')

# a user press enter after input a valid username
@socketio.on('is_online')
def user_joined(name):
    emit('online_name', name, broadcast=True)

# `inviter` selects `guest`, sending 2 usernames
@socketio.on('build_private_room')
def creat_private_room(names):
    print('The inviter is: [' + names['inviter'] + '], the guest is: [' + names['guest'] + ']')
    r = [names['inviter'], names['guest']]
    r.sort()
    room = ''.join(r)
    emit('invite_match_user', {
        'inviter': names['inviter'],
        'guest': names['guest'],
        'room': room,
        'isActive': 'true'
    }, broadcast=True)

# 2 filtered users emit this event, then join room
@socketio.on('join_private_room')
def the_private_room(data):
    join_room(data['room'])
    print('Users: ' + data['inviter'] + ', ' + data['guest'] + ' joined the room [' + data['room'] + '].')

# send private messages
@socketio.on('private_message')
def handle_message(data):
    emit('room_message', data, room=data['room'])

# startup
if __name__ == '__main__':
    socketio.run(app, debug=True)
