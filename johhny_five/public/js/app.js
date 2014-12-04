$(function(){

	var hasloaded = false;

	var current_rot_x = $('#current-rot-x');
	var rot_x;
	var current_rot_y = $('#current-rot-y');
	var rot_y;
	var current_rot_z = $('#current-rot-z');
	var rot_z;
	var current_scale_w = $('#current-scale-w');
	var scale_w;
	var current_scale_h = $('#current-scale-h');
	var scale_h;
	var current_skew_x = $('#current-skew-x');
	var skew_x;
	var current_skew_y = $('#current-skew-y');
	var skew_y;

	var socket, socketid;

	var window_height = $(window).height();

	var robot, stage, robot_y = 275;

	$("#canvas-container").draggable();
	
	$('#slider-rot-x').change(function(){
	    current_rot_x.html(this.value);
	    rot_x = this.value;
	    $('#canvas-container').css({webkitTransform: 'rotateX(' + rot_x + 'deg)'});
	});
	$('#slider-rot-x').change();

	$('#slider-rot-y').change(function(){
	    current_rot_y.html(this.value);
	    rot_y = this.value;
	    $('#canvas-container').css({webkitTransform: 'rotateY(' + rot_y + 'deg)'});
	});
	$('#slider-rot-y').change();

	$('#slider-rot-z').change(function(){
	    current_rot_z.html(this.value);
	    rot_z = this.value;
	    $('#canvas-container').css({webkitTransform: 'rotateZ(' + rot_z + 'deg)'});
	});
	$('#slider-rot-z').change();

	$('#slider-scale-w').change(function(){
	    current_scale_w.html(this.value);
	    scale_w = this.value;
	    $('#canvas-container').css({webkitTransform: 'scaleX(' + scale_w + ')'});
	});
	$('#slider-scale-w').change();

	$('#slider-scale-h').change(function(){
	    current_scale_h.html(this.value);
	    scale_h = this.value;
	    $('#canvas-container').css({webkitTransform: 'scaleY(' + scale_h + ')'});
	});
	$('#slider-scale-h').change();

	$('#slider-skew-x').change(function(){
	    current_skew_x.html(this.value);
	    skew_x = this.value;
	    $('#canvas-container').css({webkitTransform: 'skew(' + skew_x + 'deg,' + skew_y + 'deg)'});
	});
	$('#slider-skew-x').change();

	$('#slider-skew-y').change(function(){
	    current_skew_y.html(this.value);
	    skew_y = this.value;
	    $('#canvas-container').css({webkitTransform: 'skew(' + skew_x + 'deg,' + skew_y + 'deg)'});
	});
	$('#slider-skew-y').change();

	document.getElementById('fs-button').addEventListener('click', function () {
	    screenfull.toggle();
	    window_height = $(window).height();
	 	$('#container').css({'height' : window_height});
	});

	if (typeof(Humble) == 'undefined') window.Humble = {};
	Humble.Trig = {};
	Humble.Trig.init = init;

	var unit = 50,
	    canvas, context, canvas2, context2,
	    height, width, xAxis, yAxis,
	    draw, edge, infl;

	function init() {
	    
	    canvas = document.getElementById("sine-canvas");

	    $('#sine-canvas').css('background-color', 'rgba(0, 255, 0, 1)');
	    $('#sine-canvas').css({webkitTransform: 'rotateZ(90deg)'});
	    
	    canvas.width = 800;
	    canvas.height = 600;
	    
	    context = canvas.getContext("2d");
	    context.font = '18px sans-serif';
	    context.strokeStyle = '#000';
	    context.lineJoin = 'round';
	    
	    height = canvas.height;
	    width = canvas.width;
	    
	    xAxis = Math.floor(height/2);
	    yAxis = Math.floor(width/4);
	    
	    context.save();
	    draw();
	}

	draw = function () {

		infl = Math.floor(Math.random() * 20) + -20;
	    
	    context.clearRect(0, 0, width, height);

	    context.beginPath();
	    context.stroke();
	    
	    context.save();
	    context.strokeStyle = '#000';
	    context.fillStyle = '#fff';
	    context.lineWidth = 2;


	    drawRobot();

	    context.beginPath();
	    drawSine(draw.t);
	    drawSine2(draw.t);
	    context.stroke();

	    drawArrow(draw.t);

	    if(robot.y < (edge-99) || robot.y > (edge-99+200-50)){
	    	$('#sine-canvas').css('background-color', 'rgba(255, 0, 0, 1)');
	    }else{
	    	$('#sine-canvas').css('background-color', 'rgba(0, 255, 0, 1)');
	    }
	    
	    context.restore();
	    
	    draw.seconds = draw.seconds - .007;
	    draw.t = draw.seconds*Math.PI;
	    setTimeout(draw, 25);
	};
	draw.seconds = 0;
	draw.t = 0;

	function drawSine(t) {

	    var x = t;
	    var y = Math.sin(x);
	    context.moveTo(yAxis-200, unit*y+xAxis-100);
	    
	    for (i = yAxis; i <= (width+200); i += 10) {
	        x = t+(-yAxis+i)/unit;
	        y = Math.sin(x);
	        context.lineTo(i-200, unit*y+xAxis-100);
	    }
	}

	function drawSine2(t) {

	    var x = t;
	    var y = Math.sin(x);
	    context.moveTo(yAxis-200, unit*y+xAxis+100);
	    
	    for (i = yAxis; i <= (width+200); i += 10) {
	        x = t+(-yAxis+i)/unit;
	        y = Math.sin(x);
	        context.lineTo(i-200, unit*y+xAxis+100);
	    }
	}

	function drawArrow(t) {
	    
	    var x = yAxis+unit*Math.cos(t);
	    var y = xAxis+unit*Math.sin(t);

	    var x2 = yAxis+unit*Math.cos(625);
	    var y2 = xAxis+unit*Math.sin(t+25);

	    edge = y2;

	    // tekent crosshair op grenswaarde
	    // context.beginPath();
	    // context.moveTo(0, edge-99);
	    // context.lineTo(800, edge-99);
	    // context.stroke();

	    // context.beginPath();
	    // context.moveTo(625, -100);
	    // context.lineTo(625, 600);
	    // context.stroke();
	    
	}

	    Humble.Trig.init()

	function drawRobot(){
		stage = new createjs.Stage("sine-canvas");
		robot = new createjs.Shape();
	    robot.graphics.beginFill("grey").drawRect(0, 0, 50, 50);
	    robot.x = 600;
	    robot.y = robot_y;
	    stage.addChild(robot);
	    stage.update();	
	}

    socket = io("/");

	socket.on("left_down", function(data) {

		console.log(data);
		moveLeft();

	});

	socket.on("right_down", function(data) {

		console.log(data);
		moveRight();

	});

	socket.on("left_hold", function(data) {

		console.log(data);
		moveLeft();

	});

	socket.on("right_hold", function(data) {

		console.log(data);
		moveRight();

	});

	function moveLeft(){
		robot_y += 10;
		robot.set({
			x: 600,
			y: robot_y
		});
		stage.update();
	}

	function moveRight(){
		robot_y -= 10;
		robot.set({
			x: 600,
			y: robot_y
		});
		stage.update();
	}

});