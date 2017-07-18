// memanggis express js
var express = require('express');
var app = express();
// memanggil module http
var http = require('http').Server(app);
// memanggil socket.io
var io = require('socket.io')(http);

var path = require("path");

// include filee css in node js
app.use(express.static(path.join(__dirname + '/css')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	// jika ada pesan baru
	socket.on('newMessage', function(msg) {
		io.emit('newMessage', msg);
		console.log('Chat baru: ' + msg);
	});

	// jika ada yang DC
	socket.on('disconnect', function(msg) {
		console.log('user disconnected');
	});
})

// menjalankan node.js di port 9000
http.listen(9000, function() {
	console.log('Node.js sedang berjalan pada port 9000....');
})