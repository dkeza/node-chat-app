const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));

    socket.on('createMessage', (data) => {
        console.log('createMessage', data);
        io.emit('newMessage', generateMessage(data.from, data.text));

        // socket.broadcast.emit('newMessage', {
        //         from: data.from,
        //         text: data.text,
        //         createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {app}; 