$(function(){

	var socket, socketid;
	var top_canvas_offset;
	var degrees = 0;
	var yPos, amplitude, length;
	var xPos = -100;
	var road_width = 50;
	var tick_counter = 0;
	var fps = 60;
	var road_arr = [];
	var screen_filled = false
	var road_container;
	var robot, robot_xPos = 200, robot_yPos = 425;
	var edge_indicator;

/* ------------------------ CANVAS ------------------------ */

	// $('#top-canvas-container').draggable();

	var bg_canvas = document.getElementById("bg-canvas");
	var bg_stage = new createjs.Stage(bg_canvas);

	var top_canvas = document.getElementById("top-canvas");
	var top_stage = new createjs.Stage(top_canvas);

	function init(){
		road_container = new createjs.Container(); 
		bg_stage.addChild(road_container);
	}

	function drawSinWave(){
		xPos = xPos+4;
		yPos = Math.sin(degrees)*(Math.PI/180)*1000;
		var road_segment = new createjs.Shape();
		road_segment.graphics.beginFill('#ffffff').drawCircle(xPos, 425+yPos, road_width);
		road_arr.push(road_segment);
		degrees = degrees + 0.09;
		road_arr.pop();
		road_container.addChild(road_segment); 
		if(tick_counter > 320){
			road_container.x = road_container.x - 4;
		}
	}

	function drawRobot(){
		edge_yPos = Math.sin(degrees+400)*(Math.PI/180)*1000;
		top_stage.removeAllChildren();
		top_stage.update();
		robot = new createjs.Shape();
		robot.graphics.beginFill('#ABABAB').drawRect(robot_xPos, robot_yPos-50, 50, 50);
		top_stage.addChild(robot);
		edge_indicator = new createjs.Shape();
		// edge_indicator.graphics.beginFill('#0000FF').drawCircle(robot_xPos+50, 375+edge_yPos-2.5, 5);
		top_stage.addChild(edge_indicator);
	}

	createjs.Ticker.addEventListener('tick', handleTick);
	function handleTick(event) {
		drawSinWave();
		drawRobot();
		checkRobotPosition();
		length = Math.floor(Math.random() * 10) + 1;
		amplitude = (Math.random() * 1500) + 500;
		bg_stage.update();
		top_stage.update();
		top_canvas_offset = $('#top-canvas-container').offset();
		$('bg-canvas-container').css({ 'top': top_canvas_offset.top, 'left': top_canvas_offset.left});
		tick_counter++;
	}	

	function checkSegments(){
		for (var i = 0; i < Things.length - 1; i++) {
			if(road_arr[i].x > 900){
				bg_stage.removeChild(road_arr[i]);
			}
		};
	}

	function checkRobotPosition(){
		var e = 375+edge_yPos+50;
		console.log('robot y: ' + robot_yPos + ' | edge y: ' + e);
		if(robot_yPos < e-5 || robot_yPos > e + 55){
			robot.graphics.clear();
			robot.graphics.beginFill('#ff0000').drawRect(robot_xPos, robot_yPos-50, 50, 50);
		}else{
			robot.graphics.clear();
			robot.graphics.beginFill('#ABABAB').drawRect(robot_xPos, robot_yPos-50, 50, 50);
		}
	}


/* ------------------------ SOCKET ------------------------ */

    socket = io("/");

	socket.on("left_down", function(data) {
		moveLeft();
	});

	socket.on("right_down", function(data) {
		moveRight();
	});

	socket.on("left_hold", function(data) {
		moveLeft();
	});

	socket.on("right_hold", function(data) {
		moveRight();
	});

	function moveLeft(){
		console.log('move left');
		robot_yPos-=10;
	}

	function moveRight(){
		console.log('move right');
		robot_yPos+=10;
	}

	init();

});