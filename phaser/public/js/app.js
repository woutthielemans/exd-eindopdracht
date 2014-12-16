$(function(){

	var socket, socketid;
	var top_canvas_offset;
	var degrees = 0;
	var amplitude, length;
	var yPos = 200;
	var xPos = -100;
	var road_width = 200;
	var tick_counter = 0;
	var fps = 60;
	var road_arr = [];
	var screen_filled = false
	var road_container;
	var robot, robot_xPos = 200, robot_yPos = 425;
	var edge_indicator;
	var maxDiv = 35;
	var background;
	var yPos_arr = [];
	var moving_left = false, moving_right = false;

/* ------------------------ CANVAS ------------------------ */

	$('#canvas-container').draggable();
	game = new Phaser.Game(viewport().width, viewport().height, Phaser.CANVAS, 'top-canvas', { preload: preload, create: create, update:update });

	function preload(){

	}

	function create(){
		
	}

	function update(){
		
	}

/* ------------------------ SOCKET ------------------------ */

    socket = io("/");

	socket.on("left_down", function(data) {
		// moveLeft();
		moving_left = false;
		moving_right = true;
	});

	socket.on("right_down", function(data) {
		// moveRight();
		moving_right = false;
		moving_left = true;
	});

	socket.on("left_up", function(data) {
		// moveLeft();
		moving_left = false;
		moving_right = false;
	});

	socket.on("right_up", function(data) {
		// moveRight();
		moving_left = false;
		moving_right = false;
	});

	socket.on("both_down", function(data) {
		console.log('both buttons');
	});

	document.onkeydown = checkKey;

	function checkKey(e) {

	    e = e || window.event;

	    if (e.keyCode == '38') {
	        // up arrow
	        moveLeft();
	        e.preventDefault();
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	        moveRight();
			e.preventDefault();
	    }
	}

	function moveLeft(){
		//console.log('move left');
		robot_yPos-=10;
	}

	function moveRight(){
		//console.log('move right');
		robot_yPos+=10;
	}

	init();

});

// helper functie om afmetingen viewport te krijgen
function viewport() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { 
		width: e[a+'Width'], 
		height: e[a+'Height'] 
	}
}