console.log("Hello World");
const socket = io();
const chatformEl = document.getElementById('chat-form');

chatformEl.addEventListener('submit', function(e) {
	e.preventDefault();
	var name = e.target.name.value;
	var message = e.target.chat.value;

	var object = {
		name,
		message
	}

	socket.emit('chat message', object);
	e.target.chat.value = " ";
})


socket.on("chat message", (msg) => {
	var p = document.createElement('p');
	p.innerText = `${msg.name} says: ${msg.message}`;
	document.getElementById('messages').appendChild(p);
})