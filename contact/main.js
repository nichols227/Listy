$(document).ready(function(){
	$('#formSubmit').click(function(){
		var emailString = $('#email').val()
		if(emailString.indexOf("@") == -1 || emailString.indexOf(".") == -1){
			$('#email').val('');
			$('#error').show();
			return;
		}
		var nameArray = $('#name').val().split(' ');
		if(nameArray.length == 1){
			var lastName = '';
		}
		else{ 
			lastName = nameArray.slice(1).join(' ');
		}
		var emailData = {'email': emailString, 'firstName': nameArray[0], 'lastName': lastName, 'text': $('#form').val()};
		console.log(emailData);
		$('#email_us input').val('');
		$('#success').show();
		$('button').prop('disabled', true);
		$.ajax({
			url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/email',
			method: 'POST',
			data: JSON.stringify(emailData),
			processData: false,
			contentType: 'application/json',
			success: function(data, text, xhr){
				data = JSON.parse(data)
				console.log(data)
				console.log(data.email)
			}
		});
		$.ajax({
			url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/contactemail',
			method: 'POST',
			data: JSON.stringify(emailData),
			processData: false,
			contentType: 'application/json',
			success: function(data, text, xhr){
				console.log(data)
			}
		})
	});

	$('#email').focus(function(){
		$('#error').hide()
		$('#success').hide()
	})
});