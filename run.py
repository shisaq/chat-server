from flask import Flask, session, render_template, request, url_for, redirect, g
from flask_socketio import SocketIO, send, emit
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)
socketio = SocketIO(app)

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    pass

# load info from session to login_manager
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

# index with login
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        session['user'] = request.form['username']
        login_user(load_user(session['user']))

    return render_template('index.html')

# test if get session successfully
@app.route('/login')
def getsession():
    if 'user' in session:
        return session['user']

    return 'Not logged in!'

@app.route('/logout')
def logout():
    session.pop('user', None)
    logout_user()

    return redirect(url_for('index'))

@socketio.on('connect')
def connect_handler():
    if current_user.is_authenticated:
        emit('my response',
            current_user.id,
            #  {'message': '{0} has joined'.format(current_user.id)},
             broadcast=True)
    else:
        return False

@socketio.on('my name')
def regist(name):
    emit('response name', {'data': name['data']})

@socketio.on('message')
def handle_message(msg):
    print('Message:' + msg)
    send(msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
