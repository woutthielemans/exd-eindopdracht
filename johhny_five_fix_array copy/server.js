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

    var motor;
    var button_left = new j5.Button(11);
    var button_right = new j5.Button(13);

    var left_is_down = false;
    var right_is_down = false;

    motor = new j5.Motor({
      pins: {
        pwm: 9,
        dir: 12
      }
    });

    board.repl.inject({
      motor: motor,
      button: button_left,
      button: button_right
    });

    button_left.on('down', function() {
      console.log('left down');
      left_is_down = true;
      if(right_is_down == true){
        io.sockets.emit('both_down', 'both down');
      }
      io.sockets.emit('left_down', 'left down');
      motor.reverse(160);
    });

    button_left.on('up', function() {
      console.log('left up');
      left_is_down = false;
      io.sockets.emit('left_up', 'left up');
      motor.stop();
    });

    button_right.on('down', function() {
      console.log('right down');
      right_is_down = true;
      if(left_is_down == true){
        io.sockets.emit('both_down', 'both down');
      }
      io.sockets.emit('right_down', 'right down');
      motor.forward(160);
    });

    button_right.on('up', function() {
      console.log('right up');
      right_is_down = false;
      io.sockets.emit('right_up', 'right up');
      motor.stop();
    });


    // motor.on("start", function(err, timestamp) {
    //   console.log("start", timestamp);
    // });

    // motor.on("stop", function(err, timestamp) {
    //   console.log("automated stop on timer", timestamp);
    // });

    // motor.on("forward", function(err, timestamp) {
    //   console.log("forward", timestamp);

    //   // demonstrate switching to reverse after 5 seconds
    //   board.wait(5000, function() {
    //     motor.reverse(50);
    //   });
    // });

    // motor.on("reverse", function(err, timestamp) {
    //   console.log("reverse", timestamp);

    //   // demonstrate stopping after 5 seconds
    //   board.wait(5000, function() {
    //     motor.stop();
    //   });
    // });

     // motor.forward(255);

    // var button_left = new j5.Button(12);
    // var button_right = new j5.Button(13);

    // board.repl.inject({
    //   button: button_left,
    //   button: button_right,
    // });

    // button_left.on('down', function() {
    //   io.sockets.emit('left_down', 'left down');
    // });

    // button_right.on('down', function() {
    //   io.sockets.emit('right_down', 'right down');
    // });

    // button_left.on('hold', function() {
    //   io.sockets.emit('left_hold', 'left hold');
    // });

    // button_right.on('hold', function() {
    //   io.sockets.emit('right_hold', 'right hold');
    // });



  });

});

app.use(express.static(__dirname + '/public'));

server.listen(port, function () {
  console.log('Server listening at port ' + port);
});
