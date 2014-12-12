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

/* ------------------------ CANVAS ------------------------ */

	// $('#top-canvas-container').draggable();

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

		xPos = xPos+4;
		//yPos = Math.sin(degrees)*(Math.PI/180)*amplitude*10000;
		// console.log('yPos: ' + yPos);

		yPos = yPos + (maxDiv * (Math.random() -0.5));

		if (yPos <= 150) {
			yPos = 150;
		};

		if (yPos >= 360) {
			yPos = 360;
		};

		var road_segment = new createjs.Shape();
		// road_segment.graphics.beginFill('#c9c9c9').drawCircle(xPos, yPos, road_width/2);
		road_segment.graphics.beginFill('#c9c9c9').drawRect(xPos, yPos, 20,road_width/2);
		road_arr.push(road_segment);
		yPos_arr.push(yPos);
		degrees = degrees + 0.09;
		road_container.addChild(road_segment); 
		if(tick_counter > 320){
			road_container.x = road_container.x - 4;
			road_arr.shift();
			yPos_arr.shift();
		}
	}

	function drawRobot(){
		edge_yPos = yPos;
		top_stage.removeAllChildren();
		top_stage.update();
		robot = new createjs.Shape();
		robot.graphics.beginFill('#ABABAB').drawRect(robot_xPos, robot_yPos-50, 50, 50);
		top_stage.addChild(robot);
		// edge_indicator = new createjs.Shape();
		// edge_indicator.graphics.beginFill('#0000FF').drawCircle(robot_xPos+25, yPos_arr[yPos_arr.length - 243], 5);
		// top_stage.addChild(edge_indicator);
	}

	createjs.Ticker.addEventListener('tick', handleTick);
	function handleTick(event) {
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
	}	

	function checkSegments(){
		for (var i = 0; i < Things.length - 1; i++) {
			if(road_arr[i].x > 900){
				bg_stage.removeChild(road_arr[i]);
			}
		};
	}

	function checkRobotPosition(){
		var e = yPos_arr[yPos_arr.length - 243];
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
			background.x -= 4;
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