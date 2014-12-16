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

	var window_height = $(window).height();

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

	var unit = 30,
	    canvas, context, canvas2, context2,
	    height, width, xAxis, yAxis,
	    draw, edge;

	/**
	 * Init function.
	 * 
	 * Initialize variables and begin the animation.
	 */
	function init() {
	    
	    canvas = document.getElementById("sineCanvas");

	    $('#sineCanvas').css('background-color', 'rgba(255, 255, 255, 1)');
	    
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

	/**
	 * Draw animation function.
	 * 
	 * This function draws one frame of the animation, waits 20ms, and then calls
	 * itself again.
	 */
	draw = function () {
	    
	    // Clear the canvas
	    context.clearRect(0, 0, width, height);

	    // Draw the axes in their own path
	    context.beginPath();
	    context.stroke();
	    
	    // Set styles for animated graphics
	    context.save();
	    context.strokeStyle = '#000';
	    context.fillStyle = '#fff';
	    context.lineWidth = 2;

	    // Draw the sine curve at time draw.t, as well as the circle.
	    context.beginPath();
	    drawSine(draw.t);
	    context.stroke();

	    drawArrow(draw.t);
	    
	    // Restore original styles
	    context.restore();
	    
	    // Update the time and draw again
	    draw.seconds = draw.seconds - .005;
	    draw.t = draw.seconds*Math.PI;
	    setTimeout(draw, 35);
	};
	draw.seconds = 0;
	draw.t = 0;

	/**
	 * Function to draw sine
	 * 
	 * The sine curve is drawn in 10px segments starting at the origin. 
	 */
	function drawSine(t) {

	    // Set the initial x and y, starting at 0,0 and translating to the origin on
	    // the canvas.
	    var x = t;
	    var y = Math.sin(x);
	    context.moveTo(yAxis, unit*y+xAxis);
	    
	    // Loop to draw segments
	    for (i = yAxis; i <= width; i += 10) {
	        x = t+(-yAxis+i)/unit;
	        y = Math.sin(x);
	        context.lineTo(i, unit*y+xAxis);
	    }
	}

	/**
	 * Function to draw arrow
	 */
	function drawArrow(t) {
	    
	    // Cache position of arrow on the circle
	    var x = yAxis+unit*Math.cos(t);
	    var y = xAxis+unit*Math.sin(t);

	    var x2 = yAxis+unit*Math.cos(300);
	    var y2 = xAxis+unit*Math.sin(t+300);

	    edge = y2;

	    context.beginPath();
	    context.moveTo(0, edge);
	    context.lineTo(800, edge);
	    context.stroke();

	    context.beginPath();
	    context.moveTo(340, -100);
	    context.lineTo(340, 600);
	    context.stroke();
	    
	    // // Draw the arrow line
	    // context.beginPath();
	    // context.moveTo(yAxis, xAxis);
	    // context.lineTo(x, y);
	    // context.stroke();

	    // context.beginPath();
	    // context.moveTo(x2, y2);
	    // context.lineTo(300, y2);
	    // context.stroke();
	    
	    // // Draw the arrow bead
	    // context.beginPath();
	    // context.arc(x, y, 5, 0, 2*Math.PI, false);
	    // context.fill();
	    // context.stroke();

	    // context.beginPath();
	    // context.arc(x2, y2, 5, 0, 2*Math.PI, false);
	    // context.fill();
	    // context.stroke();
	    
	    // // Draw dashed line to yAxis
	    // context.beginPath();
	    // var direction = (Math.cos(t) < 0) ? 1 : -1;
	    // var start = (direction==-1) ? -5 : 0;
	    // for (var i = x;  direction*i < direction*yAxis-5; i = i+direction*10) {
	    //     context.moveTo(i+direction*5, y);
	    //     context.lineTo(i+direction*10, y);
	    // }
	    // context.stroke();
	    
	    // // Draw yAxis bead
	    // context.beginPath();
	    // context.arc(yAxis, y, 5, 0, 2*Math.PI, false);
	    // context.fill();
	    // context.stroke();
	}

	    Humble.Trig.init()

});