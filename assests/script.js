const socket = io();
socket.emit('get');

function addLi(message) {
  const li = document.createElement('LI');
  li.innerHTML = message;
  document.body.appendChild(li);
}

socket.on('task', tasks => {
  tasks.forEach(t => {
    addLi(t);
  })
})

document.getElementById('submit').onclick = () => {
  const task = document.getElementById('task').value;
  socket.emit('task', task);
}
