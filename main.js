$(document).ready(function(){
	$('#emailSubmit').click(function(){
		var emailString = $('#email').val()
		if(emailString.indexOf("@") == -1 || emailString.indexOf(".") == -1){
			$('#email').val('')
			$('#error').show()
			return
		}
		$('#email').val('')
		$('#success').show()
		var emailData = {'email': emailString}
		console.log(emailData)
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
				$.ajax({
					url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/sendemail',
					method: 'POST',
					data: JSON.stringify(data.email),
					processData: false,
					contentType: 'application/json',
					success: function(data, text, xhr){
						console.log(data)
					}
				})
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