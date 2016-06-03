$(document).ready(function(){
	$('#signUpSubmit').click(function(){
		var emailString = $('#email').val()
		if(emailString.indexOf("@") == -1 || emailString.indexOf(".") == -1){
			$('#email').val('')
			$('#error').show()
			return
		}
		var emailData = {'email': emailString}
		console.log(emailData)
		$.ajax({
			url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/email',
			method: 'POST',
			data: JSON.stringify(emailData),
			processData: false,
			contentType: 'application/json',
			success: function(data, text, xhr){
				console.log(data)
				$('#email').val('')
				$('#success').show()
			}
		});
		/*$.post('https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/email', data, function(data, text, xhr){
			console.log(data)
		})*/
	});

	$('#email').focus(function(){
		$('#error').hide()
		$('#success').hide()
	})
});