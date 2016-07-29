$(document).ready(function(){ 
	if ($('nav').hasClass('image'))
	{
		var scroll_pos = 0;
    	var end_pos = 100;
    	
    	$(document).scroll(function() {
        	scroll_pos = $(this).scrollTop();
			if (scroll_pos > end_pos) {
			$('nav').addClass('color');
			} else {
			$('nav').removeClass('color');
			}
		});
	}
		$('.menu_icon').click(function() {
		$('nav').toggleClass('mobile');
	});
});
