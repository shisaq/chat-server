$(document).ready(function() {
  var socket = io.connect();

  socket.on('connect', function() {
    socket.send('User connected.')
    console.log('Yeah! Connected!');
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
