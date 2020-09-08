const express = require('express'),
  app = express(),
  redis = require('redis'),
  redisC = redis.createClient(),
  socketio = require('socket.io');

app.use(express.static('assests'));

const server = app.listen(8080),
  io = socketio(server);

io.on('connection', socket => {
  socket.on('task', task => {
    redisC.lpush('tasks', task);
    socket.emit('task', [task]);
  })

  socket.on('get', () => {
    redisC.lrange('tasks', 0, -1, (err, tasks) => {
      if(err) throw err;
      socket.emit('task', tasks);
    })
  })
})