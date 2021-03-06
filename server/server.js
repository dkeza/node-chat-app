const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) && !isRealString(params.room)) {
            callback('name and room name are required.');
            return;
        }

        let room = params.room.toUpperCase();
        let user = users.getUserByName(params.name, room);
        
        if (user) {
            if (user.room === room) {
                callback(`name ${params.name} is already taken!`);
                return;
            }
        }

        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, room);

        io.to(params.room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast.to(room).emit('newMessage', generateMessage("Admin", `${params.name} has joined.`));
    
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();
    });
    
    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        if (user) {
            let m = generateLocationMessage(user.name, coords.latitude, coords.longitude);
            io.to(user.room).emit('newLocationMessage', m);
        }
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {app}; 