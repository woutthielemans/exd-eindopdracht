var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var j5 = require('johnny-five');
var board, leds=[], ledPins = [2,3,4,5,6,7];
board = new j5.Board();

io.on('connection', function(socket){

  board.on('ready', function() {

    console.log('ready');

    var button_left = new j5.Button(12);
    var button_right = new j5.Button(13);

    board.repl.inject({
      button: button_left,
      button: button_right,
    });

    button_left.on('down', function() {
      io.sockets.emit('left_down', 'left down');
    });

    button_right.on('down', function() {
      io.sockets.emit('right_down', 'right down');
    });

    button_left.on('hold', function() {
      io.sockets.emit('left_hold', 'left hold');
    });

    button_right.on('hold', function() {
      io.sockets.emit('right_hold', 'right hold');
    });

  });

});

app.use(express.static(__dirname + '/public'));

server.listen(port, function () {
  console.log('Server listening at port ' + port);
});
