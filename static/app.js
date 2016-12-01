$(document).ready(function() {
  var socket = io.connect();

  socket.on('connect', function() {
    socket.send('User connected.');
    console.log('Yeah! Connected!');
  });

  socket.on('response name', function(name) {
    $('.nameList').append('<option value="' + name.data + '">' + name.data + '</option>');
  });

  $('#myName').keyup(function(event){
    if (event.keyCode == 13) {
      socket.emit('my name', {data: $('#myName').val()});
      $('#myName').prop('readonly', true)
                  .css('color', 'grey');
      return false;
    }
  });

  socket.on('my response', function(user) {
    console.log(user);
    if (user.name === null) {
      return false;
    } else {
      $('.room').append('<p>Welcome, ' + user.name + '</p>');
      $('.nameList').append('<option>' + user.name + '</option>');
    }
  });

  socket.on('message', function(msg) {
    $('.room').append('<p>' + msg + '</p>');
  });

  $('#myMessage').keyup(function(event){
    if(event.keyCode == 13) {
      $('#sendButton').click();
    }
  });

  $('#sendButton').on('click', function() {
    socket.send($('#myMessage').val());
    $('#myMessage').val('');
  });
});
