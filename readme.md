# Chat server

> This is a simple sample of an online chat server.

## Requirement
 1. Have Python 2.7 installed globally;
 2. Have [pip](https://pip.pypa.io/en/stable/installing/) and [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/) installed globally.

## Installation
 1. Download this repository
   `git clone https://github.com/shisaq/chat-server.git`
 2. On the root of this repository, open your terminal
 3. Run `./run.sh` to install dependencies
    ![server running](http://7xpx1z.com1.z0.glb.clouddn.com/github/serverrunning.png)
 4. Open your browser, type `localhost:5000` or `127.0.0.1:5000`
    ![index](http://7xpx1z.com1.z0.glb.clouddn.com/github/chatserverindex.png)
 5. (optional) If you prefer, you can run `npm install` to customize the front-end works

## Technique stack

 * [Flask](http://flask.pocoo.org/)
 * [SocketIO](http://socket.io/)
 * [React](https://facebook.github.io/react/)

## Known issues

 * Scorll bar cannot scroll to bottom automatically when finished initially loading the room messages.
 * Messages actually store in localStorage. They may conflate when another user login at the same computer with the prior one.
 * It has not fitted for multiple sizes of screens.
 * Sometimes it may judge a user offline, due to unstable network.
 * Rooms list is an array now. But it should be an object, including every item named by the room name. Just like Room messages object.

## Liscense

MIT
