var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    console.log('newMessage', data);
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    var textBox = jQuery('[name=message]');
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: textBox.val()
    }, function() {

    });

    textBox.val('');

});