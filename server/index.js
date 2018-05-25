// Setup basic express server
const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;

server.listen(port, function () {
  console.log('Server listening at port %d', port)
});

// Chatroom

io.on('connection', function (socket) {
  socket.on('send message',function (data) {
    // echo globally (all clients) that a person send a message
    console.log(data);
    let message = data.message;
    let receiverID = message.receiver.id;
    if(message.room){
      socket.broadcast.emit('groupBroadcast', {
        message: message
      })
    }else{
      socket.broadcast.emit(receiverID, {
        message: message
      })
    }
  });
  socket.on('disconnect', function(data){
    console.log('user disconnected')
  })
});
