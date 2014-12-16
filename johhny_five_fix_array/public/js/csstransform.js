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
	    scale_w = this.value/100;
	    $('#canvas-container').css({webkitTransform: 'scaleX(' + scale_w + ')'});
	});
	$('#slider-scale-w').change();

	$('#slider-scale-h').change(function(){
	    current_scale_h.html(this.value);
	    scale_h = this.value/100;
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
	});

});