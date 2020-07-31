// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
       console.log(data);
    });

    client.on('messages', function(data) {
       console.log(data);
       var changed = data.replace(/a/g,"i");
       changed = changed.replace(/u/g,"i");
       changed = changed.replace(/e/g,"i");
       changed = changed.replace(/o/g,"i");
       client.emit('messages', changed);
    });
});

server.listen(4200);
