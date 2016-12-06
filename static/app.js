$(document).ready(function() {
  var socket = io.connect();

  // 0. 连接
  socket.on('connect', function() {
    socket.send('User connected.');
    console.log('Yeah! Connected!');
    console.log(socket.id);
  });

  // 3. 接收服务器的name，放到user list中
  socket.on('my response', function(user) {
    if (user.name === null) {
      return false;
    } else {
      $('.room').append('<p>Welcome, ' + user.name + '</p>');
      $('#nameList').append('<option value="' + name.data + '">' + user.name + '</option>');
    }
  });

  socket.on('update_list', function(msg) {
    console.log($('.nameListItem[value=' + msg.data + ']').length);
    if ($('.nameListItem[value=' + msg.data + ']').length === 0) {
      console.log('inside loop');
      $('#nameList').append('<option class="nameListItem" value="' + msg.data + '">' + msg.data + '</option>');
    }
    console.log('Done.');
  });

  // 4. 点击发送按钮，发送myMessage的值给服务器
  $('#sendButton').on('click', function() {
    socket.send($('#myMessage').val());
    $('#myMessage').val('');
  });
 // 回车相当于点发送按钮
  $('#myMessage').keyup(function(event){
    if(event.keyCode == 13) {
      $('#sendButton').click();
    }
  });

  // 6. 把从服务器收到的message放到.room里面
  socket.on('message', function(msg) {
    $('.room').append('<p>' + msg + '</p>');
  });
});
