const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' }})

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, usersInfo } = require('./utils/users');

const botName = 'ChatApp';

//Run when client connects
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join', (data)=> {
      const user = userJoin(socket.id, data.user);
     //users[socket.id] = data.user;
      socket.join(data.user)
      
      socket.broadcast.emit('roomUsers', {
        users: usersInfo()
      });

      // Send users info
      io.to(user.username).emit('roomUsers', {
        users: usersInfo()
      });
    })

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
      io.to(socket.id).emit('message', formatMessage(user.username,msg.targetName, msg));
      io.to(msg.targetId).emit('message', formatMessage(user.username,msg.targetName, msg));
    });

    // Runs when client disconnects
    socket.on('leave', () => {
      const user = userLeave(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );
  
        // Send users info
        socket.broadcast.emit('roomUsers', {
          users: usersInfo()
        });
      }
    });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
