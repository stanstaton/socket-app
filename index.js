const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//serve static file w/ the index.html (css, client-side js, images, etc)
app.use('/', express.static("static"));

app.get('/', (req,res) => {
	res.sendFile(__dirname + "/index.html")
})

io.on("connection", function(socket) {
	console.log("a client connected!");
	//server receives a chat message - propagate it to all other clients
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg)
	})

	socket.on("disconnect", () => {
		console.log("a client disconnected")
	})
})


http.listen(3001, () => {
	console.log("server now listening on port 3001")
})