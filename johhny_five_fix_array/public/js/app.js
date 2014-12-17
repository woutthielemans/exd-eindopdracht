$(function(){

	var run_game = false;
	var menu = true;
	var play_counter = 0;
	var player_score;
	var menu_showing = false;
	var moving_left = false, moving_right = false;

	socket = io("/");

	socket.on("left_down", function(data) {
		moving_left = false;
		moving_right = true;
	});

	socket.on("right_down", function(data) {
		if(!menu_showing){
			moving_right = false;
			moving_left = true;
		}else{
			startGame();
			game_on = true;
		}
	});

	socket.on("left_up", function(data) {
		moving_left = false;
		moving_right = false;
	});

	socket.on("right_up", function(data) {
		moving_left = false;
		moving_right = false;
	});

	socket.on("both_down", function(data) {
		// console.log('both buttons');
	});

	console.log('in function');

	function menuinit(){

		document.onkeydown = checkKey;

		play_counter++;

		if(play_counter>1){
			$('#player-score').show();
			$('#player-score').html(player_score);
		}else{
			$('#player-score').hide();
		}

		distance_moved = 0;

		menu = true;

		var lives = 3;
		$('#lives span').html(lives);

		var run_game = false;

		console.log('in menu init');

		if(play_counter > 1){
			$('#menu').hide();
			$('#menu2').show();
		}else{
			$('#menu').show();
			$('#menu2').hide();
		}
		$('#test').hide();
		$('#star').hide();
		$('#lives').hide();
		$('#distance').hide();
		$('#multi').hide();

		function gameinit(){

			if(run_game){

				console.log('in game init');

				var socket, socketid;
				var top_canvas_offset;
				var degrees = 0;
				var amplitude, length;
				var yPos = 200, xPos = -4;
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
				moving_left = false;
				moving_right = false;
				var speed = 4, prev_speed = 4;
				var distance_moved = 0;
				var adj_speed;
				var step_counter = 0;
				var max_steps, prev_max_steps;
				var check_frame, prev_check_frame;
				var transition_steps = 0;
				var first_time = true, first_time_1 = true, first_time_2 = true, first_time_3 = true, first_time_4 = true, first_time_5 = true, first_time_6 = true;
				var trans_frame
				// var incr_treshold;
				var is_playing = false;
				var off_road_timer = 0;
				menu_showing = false;
				var game_on = false;
				var stop_timer = false;
				var forgiveness = 25;
				var score_multiplier = 1;
				var score_multiplier_counter = 0;
				var canvas_xPos, canvas_yPos;
				var menu_xPos, menu_yPos;

			/* ------------------------ CANVAS ------------------------ */

				// $('#canvas-container').draggable({
				// 	drag: function(){
				// 				console.log('dragging');
				// 				updatePosition();
				// 				$('#menu').css({
				// 				'top':bg_canvas.x + bg_canvas.width/2 - 300,
				// 				'left':bg_canvas.y + bg_canvas.height/2 - 200
				// 			});
				// 	}
				// });

	 			$('#canvas-container').draggable();

				var bg_canvas = document.getElementById("bg-canvas");
				var bg_stage = new createjs.Stage(bg_canvas);

				var top_canvas = document.getElementById("top-canvas");
				var top_stage = new createjs.Stage(top_canvas);

				function init(){

					console.log('in init');

					$('#lives span').html(lives);
					createjs.Ticker.addEventListener('tick', handleTick);
					$('#test').hide();
					$('#lives').show();
					$('#star').show();
					$('#distance').show();
					$('#multi').show();
					$('#lives span').html(lives);
					$('#distance span').html(distance_moved);
					$('#multi span').html(score_multiplier);
					stop_timer = false;
					background = new createjs.Bitmap("/assets/images/background.png");
					bg_stage.addChild(background);
					road_container = new createjs.Container(); 
					bg_stage.addChild(road_container);
				}

				function drawSinWave(){

					// w 1150
					// h 850

					xPos = xPos+speed;

					yPos = yPos + (maxDiv * (Math.random() -0.5));

					if (yPos <= 175) {
						yPos = 175;
					};

					if (yPos >= 335) {
						yPos = 335;
					};

					var road_segment = new createjs.Shape();
					road_segment.graphics.beginFill('#c9c9c9').drawRect(xPos, yPos, speed+10,road_width/2);
					road_arr.push(road_segment);
					yPos_arr.push(yPos);
					degrees = degrees + 0.09;
					road_container.addChild(road_segment); 

					if(step_counter > max_steps){

						road_container.x = road_container.x - speed;
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
					robot.graphics.beginFill('#ababab').drawRect(robot_xPos, robot_yPos-30, 30, 30);
					if (robot_yPos <= 215) {
						robot_yPos = 215;
					};

					if (robot_yPos >= 415) {
						robot_yPos = 415;
					};
					top_stage.addChild(robot);
					edge_indicator = new createjs.Shape();
				}

				function handleTick(event) {
					// $("#canvas-container").on( "drag", function(){
					// 								console.log('dragging');
					// 								updatePosition();
					// 								$('#menu').css({
					// 								'top':menu_xPos,
					// 								'left':menu_yPos
					// 								});}
					// );

					if(lives > 0){

						$('#lives').html(lives);

						console.log('lives: ' + lives);

						distance_moved += 1*score_multiplier;
						player_score = distance_moved;
						console.log('distance: ' + distance_moved);
						$('#multi span').html(score_multiplier);

						if(distance_moved > 284){
							if(score_multiplier_counter === 750){
								score_multiplier+=2; 	
								$('#multi span').html(score_multiplier);
								score_multiplier_counter = 0;
							}else{
								score_multiplier_counter++;
								console.log('score score_multiplier: ' + score_multiplier_counter + '/1000');
							}
						}

						$('#distance').html(distance_moved);
						adj_speed = Math.round(78/(speed/4));
						if(distance_moved < 960+284){
							console.log('speed: ' + speed);
							speed = 4;
							prev_speed = 4;
							road_width = 200;
							max_steps = 284;
							prev_max_steps = 284;
							check_frame = 72;
							prev_check_frame = 72;
							if(first_time_1){
								transition_steps = 0;
								first_time_1 = false;
							}
						}
						if(distance_moved > 960+284 && distance_moved < 1920) {
							console.log('speed: ' + speed);
							speed = 8;
							prev_speed = 4;
							road_width = 190;
							max_steps = 142;
							prev_max_steps = 284;
							check_frame = 178;
							prev_check_frame = 72;
							if(first_time_2){
								transition_steps = 0;
								first_time_2 = false;
							}
						}
						if(distance_moved > 1920 && distance_moved < 2880) {
							console.log('speed: ' + speed);
							speed = 12;
							prev_speed = 8;
							road_width = 180;
							max_steps = 95;
							prev_max_steps = 142;
							check_frame = 214;
							prev_check_frame = 178;
							if(first_time_3){
								transition_steps = 0;
								first_time_3 = false;
							}
						} 
						if(distance_moved > 2880 && distance_moved < 3840) {
							console.log('speed: ' + speed);
							speed = 16;
							prev_speed = 8;
							road_width = 170;
							max_steps = 71;
							prev_max_steps = 95;
							check_frame = 232;
							prev_check_frame = 214;
							if(first_time_4){
								transition_steps = 0;
								first_time_4 = false;
							}
						}
						if(distance_moved > 3840 && distance_moved < 4800){
							console.log('speed: ' + speed);
							speed = 20;
							prev_speed = 16;
							road_width = 160;
							max_steps = 57;
							prev_max_steps = 71;
							check_frame = 242;
							prev_check_frame = 232;
							if(first_time_5){
								transition_steps = 0;
								first_time_5 = false;
							}
						}
						if(distance_moved > 4800) {
							console.log('speed: ' + speed);
							speed = 24;
							prev_speed = 16;
							road_width = 150;
							max_steps = 48;
							prev_max_steps = 57;
							check_frame = 249;
							prev_check_frame = 242;
							if(first_time_6){
								transition_steps = 0;
								first_time_6 = false;
							}
						}
						drawSinWave();
						drawRobot();
						if(distance_moved > 284){
							checkRobotPosition();
						}
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
				}

				function checkSegments(){

					for (var i = 0; i < road_arr.length - 1; i++) {
						if(road_arr[i].x > 900){
							bg_stage.removeChild(road_arr[i]);
						}
					};
				}

				function checkRobotPosition(){
					if(transition_steps <= (check_frame - prev_check_frame)) transition_steps++;
					trans_frame = (yPos_arr.length - ((Math.round(prev_max_steps*.75)) - transition_steps));
					edge_indicator.graphics.beginFill('#0000FF').drawCircle(robot_xPos+7.5, yPos_arr[trans_frame], 5);
					top_stage.addChild(edge_indicator);
					var e = yPos_arr[trans_frame];

					// top: grotere waarde -> kleinere treshhold
					// bottom: kleinere waarde -> kleinere treshhold
					if(robot_yPos < e - 15 || robot_yPos > e + road_width - 60){

						// OFF ROAD
						score_multiplier = 1;
						score_multiplier_counter = 0;
						$('#multi span').html(score_multiplier);

						$('#test').show();
						robot.graphics.clear();
						robot.graphics.beginFill('#0000ff').drawRect(robot_xPos, robot_yPos-30, 30, 30);

						if(off_road_timer === forgiveness && distance_moved > 284){
							off_road_timer = 0;
							lives--;
							if(lives < 1) gameOver();
						}else{
							if(!stop_timer) off_road_timer++;
						}

					}else{

						// ON ROAD

						$('#test').hide();
						robot.graphics.clear();
						robot.graphics.beginFill('#ababab').drawRect(robot_xPos, robot_yPos-30, 30, 30);
						off_road_timer = 0;

					}
				}

				function scrollBackground(){
					if(background.x <= -6278){
						background.x = -1;
					} else{
						background.x -= speed;
					}
				}

				function gameOver(){
					console.log('GAME OVER');
					off_road_timer = 0;
					stop_timer = true;
					resetGame();
				}

				function resetGame(){
					menu = true;
					run_game = false;
					bg_stage.removeAllChildren();
					top_stage.removeAllChildren();
					robot.graphics.clear();
					edge_indicator.graphics.clear;
					speed = 4;
					prev_speed = 4;
					road_width = 200;
					max_steps = 284;
					prev_max_steps = 284;
					check_frame = 72;
					prev_check_frame = 72;
					restart();
				}

				function restart(){
					menuinit();
					// $('#menu').show();
				}

				// function updatePosition(){
				// 	canvas_xPos = $('#canvas-container').css('left');
				// 	canvas_yPos = $('#canvas-container').css('top');
				// 	menu_xPos = canvas_yPos;
				// 	console.log('mx: ' + menu_xPos);
				// 	menu_yPos = canvas_xPos;
				// 	console.log('my: ' + menu_xPos);
				// }


			/* ------------------------ SOCKET ------------------------ */


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
					robot_yPos-=10;
				}

				function moveRight(){
					robot_yPos+=10;
				}

				init();

			}

		}

		$('#start-button').on('click', function(){
			$('#menu').hide();
			$('#menu2').hide();
			menu = false;
			run_game = true;
			gameinit();
		});

		function checkKey(e) {

		    e = e || window.event;

		    if (e.keyCode == '39') {
				e.preventDefault();
				$('#menu').hide();
				$('#menu2').hide();
				menu = false;
				run_game = true;
				gameinit();
		    }
		}

	}

	menuinit();

});