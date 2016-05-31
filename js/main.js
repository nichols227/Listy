$(document).ready(function(){ 
	if ($('nav').hasClass('image'))
	{
		var scroll_pos = 0;
    	var end_pos = 200;
    	$(document).scroll(function() {
        	scroll_pos = $(this).scrollTop();
			if (scroll_pos > end_pos) {
			$('nav').addClass('color');
			} else {
			$('nav').removeClass('color');
			}
		});
	}
});

$('.toggle').click(function() {
	$('.main_nav').addClass('mobile');
});

$('.exit, .active').click(function() {
	$('.main_nav').removeClass('mobile');
});
