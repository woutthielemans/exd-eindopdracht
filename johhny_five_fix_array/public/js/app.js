$(function(){

	var socket, socketid;
	var top_canvas_offset;
	var degrees = 0;
	var amplitude, length;
	var yPos = 200;
	var xPos = -100;
	var road_width = 150;
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
	var speed = 16;
	var distance_moved = 0;
	var adj_speed;

/* ------------------------ CANVAS ------------------------ */

	$('#canvas-container').draggable();

	var bg_canvas = document.getElementById("bg-canvas");
	var bg_stage = new createjs.Stage(bg_canvas);

	var top_canvas = document.getElementById("top-canvas");
	var top_stage = new createjs.Stage(top_canvas);

	function init(){
		background = new createjs.Bitmap("/assets/images/background.png");
		bg_stage.addChild(background);
		road_container = new createjs.Container(); 
		bg_stage.addChild(road_container);
	}

	function drawSinWave(){

		console.log('drawspeed: ' + speed);
		xPos = xPos+speed;
		console.log('drawspeed after: ' + speed);
		//yPos = Math.sin(degrees)*(Math.PI/180)*amplitude*10000;
		// console.log('yPos: ' + yPos);

		yPos = yPos + (maxDiv * (Math.random() -0.5));

		if (yPos <= 175) {
			yPos = 175;
		};

		if (yPos >= 335) {
			yPos = 335;
		};

		var road_segment = new createjs.Shape();
		// road_segment.graphics.beginFill('#c9c9c9').drawCircle(xPos, yPos, road_width/2);
		console.log('yPos: ' + yPos);
		road_segment.graphics.beginFill('#c9c9c9').drawRect(xPos, yPos, speed+10,road_width/2);
		road_arr.push(road_segment);
		yPos_arr.push(yPos);
		degrees = degrees + 0.09;
		road_container.addChild(road_segment); 
		if(tick_counter > (viewport().width/720)){

		road_container.x = road_container.x - speed;
		road_arr.pop();
		yPos_arr.shift();

		}
		// console.log('adj yPos: ' + yPos_arr[adj_speed]);
		// console.log('adj: ' + adj_speed);
		// console.log('adj y: ' + road_arr[adj_speed].y);
		// road_arr[adj_speed].y += 0.001;
	}

	function drawRobot(){
		edge_yPos = yPos;
		top_stage.removeAllChildren();
		top_stage.update();
		robot = new createjs.Shape();
		robot.graphics.beginFill('#ABABAB').drawRect(robot_xPos, robot_yPos-50, 50, 50);
		if (robot_yPos <= 150) {
			robot_yPos = 150;
		};

		if (robot_yPos >= 460) {
			robot_yPos = 460;
		};
		top_stage.addChild(robot);
		edge_indicator = new createjs.Shape();
	}

	createjs.Ticker.addEventListener('tick', handleTick);
	function handleTick(event) {
		distance_moved++;
		adj_speed = Math.round(78/(speed/4));
		// console.log('adjusted speed: ' + yPos_arr[adj_speed]);
		// if(distance_moved < 960){
		// 	speed = 4;
		// 	road_width = 200;
		// }
		// if(distance_moved > 960 && distance_moved < 1920) {
		// 	 speed = 8;
		// 	 road_width = 190;
		// }
		// if(distance_moved > 1920 && distance_moved < 2880) {
		// 	speed = 12;
		// 	road_width = 180;
		// } 
		// if(distance_moved > 2880 && distance_moved < 3840) {
		// 	speed = 16;
		// 	road_width = 170;
		// }
		// if(distance_moved > 3840 && distance_moved < 4800){
		// 	speed = 20;
		// 	road_width = 160;
		// }
		// if(distance_moved > 4800) {
		// 	speed = 24;
		// 	road_width = 150;
		// }
		if(distance_moved < 250+320){
			console.log('speed: ' + speed);
			speed = 4;
			road_width = 200;
		}
		if(distance_moved > 250+320 && distance_moved < 500+320) {
			console.log('speed: ' + speed);
			 speed = 8;
			 road_width = 190;
		}
		if(distance_moved > 500+320 && distance_moved < 750+320) {
			console.log('speed: ' + speed);
			speed = 12;
			road_width = 180;
		} 
		if(distance_moved > 750+320 && distance_moved < 1000+320) {
			console.log('speed: ' + speed);
			speed = 16;
			road_width = 170;
		}
		if(distance_moved > 1250+320 && distance_moved < 1500+320){
			console.log('speed: ' + speed);
			speed = 20;
			road_width = 160;
		}
		if(distance_moved > 1750+320) {
			console.log('speed: ' + speed);
			speed = 24;
			road_width = 150;
		}
		drawSinWave();
		drawRobot();
		checkRobotPosition();
		scrollBackground();
		// console.log('length: ' + yPos_arr.length);
		// console.log(yPos_arr);
		length = Math.floor(Math.random() * 10) + 1;
		amplitude = Math.random();
		bg_stage.update();
		top_stage.update();
		top_canvas_offset = $('#top-canvas-container').offset();
		$('bg-canvas-container').css({ 'top': top_canvas_offset.top, 'left': top_canvas_offset.left});
		tick_counter++;
		if(moving_left) robot_yPos-=9.7;
		if(moving_right) robot_yPos+=9.7;
	}	

	function checkSegments(){

		for (var i = 0; i < road_arr.length - 1; i++) {
			if(road_arr[i].x > 900){
				bg_stage.removeChild(road_arr[i]);
			}
		};
	}

	function checkRobotPosition(){
		//LEVEL1
		//edge_indicator.graphics.beginFill('#0000FF').drawCircle(robot_xPos+25, yPos_arr[78], 5);
		//LEVEL2
		edge_indicator.graphics.beginFill('#0000FF').drawCircle(robot_xPos+25, yPos_arr[adj_speed], 5);
		console.log(yPos_arr.length);
		top_stage.addChild(edge_indicator);
		//LEVEL1
		// var e = yPos_arr[78];
		//LEVEL2
		var e = yPos_arr[adj_speed]
		// var e = yPos_arr[yPos_arr.length - 243];
		if(robot_yPos < e + 15 || robot_yPos > e + road_width - 75){
			robot.graphics.clear();
			robot.graphics.beginFill('#ff0000').drawRect(robot_xPos, robot_yPos-50, 50, 50);
		}else{
			robot.graphics.clear();
			robot.graphics.beginFill('#ABABAB').drawRect(robot_xPos, robot_yPos-50, 50, 50);
		}
	}

	function scrollBackground(){
		if(background.x <= -6278){
			background.x = -1;
		} else{
			background.x -= speed;
		}
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

	init();

});