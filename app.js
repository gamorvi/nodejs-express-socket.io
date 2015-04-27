//require express and get the express functionality
//we do need an http server object by creating an object called server
//socket functionality by creating io and make it listen on server
//then tell the server to listen on port 3000
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
//then tell the server to listen on port 3000   
server.listen(3000);
//now lets create a route by using app.get
//res.sendfile to let the response go to index.html or send feedback from index.html
app.get('/', function(req, res){
    res.sendfile(__dirname+'/index.html');
});
//receive event on the server side
//when a user connects to our server io.socket.on connection initializes their connection
io.sockets.on('connection', function(socket){
    //send this message to anyone who just connected
    //socket.emit('message', {message:'Welcome to the chat'});
    //handle any other chats
    socket.on('send message', function(data){
        //when the message arrives send it back out to all users connected
        //socket.broadcast.emit will send to everyone except the sender
        
        io.sockets.emit('new message', data);
    });
});