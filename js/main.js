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
	$('.post_text').each(function(event){
	
		var max_length = 500;
		
		if($(this).html().length > max_length)
		{
			var short_content 	= $(this).html().substr(0,max_length); 
			var long_content	= $(this).html().substr(max_length);
			
			$(this).html(short_content+
						'<span class="ellipsis">...</span>'+
						'<a href="#" class="read_more">&emsp; Read More</a>'+
						'<span class="more_text" style="display:none;">'+long_content+'</span>');	
								 
			$(this).find('a.read_more').click(function(event){		
				$(this).hide();
				$(this).parents('.post').addClass('focus');
				$(this).parents('.post_text').find('.ellipsis').hide();
				$(this).parents('.post_text').find('.more_text').show();
		 
			});	
		}		
	});
	$('.toggle').click(function() {
		$('.main_nav').addClass('mobile');
	});

	$('.exit, .active').click(function() {
		$('.main_nav').removeClass('mobile');
	});
	$('.return').click(function() {
		$('.post').removeClass('focus');
		$('.post').find('.ellipsis, .read_more').show();
		$('.post').find('.more_text').hide();
		window.scrollTo(0,0);
	});
	
});
