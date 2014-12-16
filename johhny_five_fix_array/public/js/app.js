$(function(){

	var socket, socketid;
	var top_canvas_offset;
	var degrees = 0;
	var amplitude, length;
	var yPos = 200;
	var xPos = -4;
	var road_width = 150;
	var tick_counter = 0;
	var fps = 60;
	var road_arr = [];
	var screen_filled = false
	var road_container;
	var robot, robot_xPos = Math.round(1150*.25), robot_yPos = 425;
	var edge_indicator;
	var maxDiv = 35;
	var background;
	var yPos_arr = [];
	var moving_left = false, moving_right = false;
	var speed = 16;
	var distance_moved = 0;
	var adj_speed;
	var step_counter = 0;
	var max_steps;
	var prev_max_steps;
	var check_frame;
	var prev_check_frame;
	var transition_steps = 0;
	var prev_speed = 4;
	var first_time = true;
	var trans_frame;
	var first_time_1 = true;
	var first_time_2 = true;
	var first_time_3 = true;
	var first_time_4 = true;
	var first_time_5 = true;
	var first_time_6 = true;
	var test;
	// var incr_treshold;

/* ------------------------ CANVAS ------------------------ */

	$('#canvas-container').draggable();

	var bg_canvas = document.getElementById("bg-canvas");
	var bg_stage = new createjs.Stage(bg_canvas);

	var top_canvas = document.getElementById("top-canvas");
	var top_stage = new createjs.Stage(top_canvas);

	function init(){
		$('#test').hide();
		background = new createjs.Bitmap("/assets/images/background.png");
		bg_stage.addChild(background);
		road_container = new createjs.Container(); 
		bg_stage.addChild(road_container);
	}

	function drawSinWave(){

		// w 1150
		// h 850

		// console.log('canvas width:' + bg_canvas.width);
		
		// console.log('counting steps:' + step_counter);
		// console/log('width should be: ' + viewport().width/287.5)
		xPos = xPos+speed;
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
		// console.log('yPos: ' + yPos);
		road_segment.graphics.beginFill('#c9c9c9').drawRect(xPos, yPos, speed+10,road_width/2);
		road_arr.push(road_segment);
		yPos_arr.push(yPos);
		degrees = degrees + 0.09;
		road_container.addChild(road_segment); 

		if(step_counter > max_steps){

			road_container.x = road_container.x - speed;
			// console.log('road array length: ' + road_arr.length);
			road_arr.pop();
			yPos_arr.shift();

		}

		step_counter++;
	
	}

	function drawRobot(){
		edge_yPos = yPos;
		top_stage.removeAllChildren();
		top_stage.update();
		robot = new createjs.Shape();
		robot.graphics.beginFill('#0000ff').drawRect(robot_xPos, robot_yPos-30, 30, 30);
		if (robot_yPos <= 215) {
			robot_yPos = 215;
		};

		if (robot_yPos >= 415) {
			robot_yPos = 415;
		};
		top_stage.addChild(robot);
		edge_indicator = new createjs.Shape();
	}

	createjs.Ticker.addEventListener('tick', handleTick);
	function handleTick(event) {
		distance_moved++;
		adj_speed = Math.round(78/(speed/4));
		// console.log('treshold: ' + incr_treshold);
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
		if(distance_moved < 960+284){
			// console.log('speed: ' + speed);
			speed = 4;
			prev_speed = 4;
			road_width = 200;
			max_steps = 284;
			prev_max_steps = 284;
			check_frame = 72;
			prev_check_frame = 72;
			if(first_time_1){
				// incr_treshold = 800;
				transition_steps = 0;
				first_time_1 = false;
			}
		}
		if(distance_moved > 960+284 && distance_moved < 1920+142) {
			// console.log('speed: ' + speed);
			speed = 8;
			prev_speed = 4;
			road_width = 190;
			max_steps = 142;
			prev_max_steps = 284;
			check_frame = 178;
			prev_check_frame = 72;
			if(first_time_2){
				// incr_treshold = 800;
				transition_steps = 0;
				first_time_2 = false;
			}
		}
		if(distance_moved > 1920+142 && distance_moved < 2880+95) {
			// console.log('speed: ' + speed);
			speed = 12;
			prev_speed = 8;
			road_width = 180;
			max_steps = 95;
			prev_max_steps = 142;
			check_frame = 214;
			prev_check_frame = 178;
			if(first_time_3){
				// incr_treshold = 800;
				transition_steps = 0;
				first_time_3 = false;
			}
		} 
		if(distance_moved > 2880+95 && distance_moved < 3840+71) {
			// console.log('speed: ' + speed);
			speed = 16;
			prev_speed = 8;
			road_width = 170;
			max_steps = 71;
			prev_max_steps = 95;
			check_frame = 232;
			prev_check_frame = 214;
			if(first_time_4){
				// incr_treshold = 800;
				transition_steps = 0;
				first_time_4 = false;
			}
		}
		if(distance_moved > 3840+71 && distance_moved < 4800+57){
			// console.log('speed: ' + speed);
			speed = 20;
			prev_speed = 16;
			road_width = 160;
			max_steps = 57;
			prev_max_steps = 71;
			check_frame = 242;
			prev_check_frame = 232;
			if(first_time_5){
				// incr_treshold = 800;
				transition_steps = 0;
				first_time_5 = false;
			}
		}
		if(distance_moved > 4800+57) {
			// console.log('speed: ' + speed);
			speed = 24;
			prev_speed = 16;
			road_width = 150;
			max_steps = 48;
			prev_max_steps = 57;
			check_frame = 249;
			prev_check_frame = 242;
			if(first_time_6){
				// incr_treshold = 800;
				transition_steps = 0;
				first_time_6 = false;
			}
		}
		drawSinWave();
		drawRobot();
		checkRobotPosition();
		scrollBackground();
		length = Math.floor(Math.random() * 10) + 1;
		amplitude = Math.random();
		bg_stage.update();
		top_stage.update();
		top_canvas_offset = $('#top-canvas-container').offset();
		$('bg-canvas-container').css({ 'top': top_canvas_offset.top, 'left': top_canvas_offset.left});
		tick_counter++;
		if(moving_left) robot_yPos-=18.6;
		if(moving_right) robot_yPos+=18.6;
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
		if(transition_steps <= (check_frame - prev_check_frame)){
			transition_steps++;
		}
		// console.log('transition steps: ' + transition_steps);
		trans_frame = (yPos_arr.length - ((Math.round(prev_max_steps*.75)) - transition_steps));
		// console.log('checking frame: ' + trans_frame);
		edge_indicator.graphics.beginFill('#0000FF').drawCircle(robot_xPos+7.5, yPos_arr[trans_frame], 5);
		top_stage.addChild(edge_indicator);
		//LEVEL1
		// var e = yPos_arr[78];
		//LEVEL2
		var e = yPos_arr[trans_frame];
		// var e = yPos_arr[yPos_arr.length - 243];
		if(robot_yPos < e - 15 || robot_yPos > e + road_width - 45){
			$('#test').show();
			console.log('OFAIZFG+OUAGF+OAUZFGIAUEFGIAUEF+IEAUYFGIAUZ/EFG/AKUEFG/KAUEFG/AUEIFGIUAEFGIUAEFGIUAEGFK/JFV/KHSV/JHSFV/AJHVFJ/EAYF/JYAEFJAYZEF/JYAEV/JHSV/JYSF/JYAVF/AUYFJYSV/YA');
			robot.graphics.clear();
			robot.graphics.beginFill('#00ff00').drawRect(robot_xPos, robot_yPos-30, 30, 30);
		}else{
			$('#test').hide();
			robot.graphics.clear();
			robot.graphics.beginFill('#0000ff').drawRect(robot_xPos, robot_yPos-30, 30, 30);
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
		// console.log('both buttons');
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

	// function viewport() {
	// 	var e = window, a = 'inner';
	// 	if (!('innerWidth' in window)) {
	// 		a = 'client';
	// 		e = document.documentElement || document.body;
	// 	}
	// 	return { 
	// 		width: e[a+'Width'], 
	// 		height: e[a+'Height'] 
	// 	}
	// }

	init();

});