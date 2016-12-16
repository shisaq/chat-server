# Chat server

> This is a simple sample of an online chat server.

## Technique stack

 * [Flask](http://flask.pocoo.org/)
 * [SocketIO](http://socket.io/)
 * [React](https://facebook.github.io/react/)

## Known issues

 * Scorll bar cannot scroll to bottom automatically when finished initially loading the room messages.
 * Messages actually store in localStorage. They may conflate when another user login at the same computer with the prior one.
 * It has not fitted for multiple sizes of screens.
 * Sometimes it may judge a user offline, due to unstable network.

## Liscense

MIT
