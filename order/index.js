$(document).ready(function(){
	if(localStorage.SimplistList){
		$('#list').val(localStorage.SimplistList)
	}
	$('#listSubmit').click(function(){
		localStorage.setItem("SimplistList", $('#list').val());
		window.location.href = 'contactInfo.html';
	});
});