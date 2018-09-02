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

socket.on('newLocationMessage', function(message) {
    console.log('newLocationMessage', message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location');
    })
});