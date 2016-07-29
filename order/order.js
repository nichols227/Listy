var list;
var dayList =[];
var dayCounter = -1;
var d = new Date(0);
var previousDate = d.toString().split(' ').slice(0,3).join(' ');
$.ajax({
	url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/scheduler',
	method: 'GET',
	success: function(data, status, xhr){
		console.log(data);
		timeArr = $.parseJSON(data);
		for (var i = 0; i < timeArr.length; i++) {
			var time = timeArr[i];
			var count = time[1]
			var date = new Date(time[0]);
			var day = date.toString().split(' ').slice(0,3).join(' ');
			if(previousDate != day){
				dayCounter += 1;
				$('#day').append("<option value='" + dayCounter +"'>" + day + "</option>")
				dayList[dayCounter] = '';
				previousDate = day;
			}
			var time = parseInt(time[0].split(' ')[1].split(':')[0]);
			var am = 'AM';
			var val = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + time + ":00:00";
			var optionString = '<option value="' + val +'" ';
			if(count >=2){
				optionString += 'disabled';
			}
			if(time > 12){
				am = 'PM';
				time -= 12;
			} else if(time == 12){
				am = 'PM'
			}
			optionString += '>' + time + ':00 ' + am + ' - ';
			if(time == 12){
				optionString += '1:00 PM</option>';
			} else if(time == 11){
				optionString += '12:00 PM</option>'
			}else {	
				optionString += (time + 1) + ":00 " + am + "</option>";
			}
			dayList[dayCounter] += optionString;
		}
		$('#delivery').append(dayList[0]);
	}
})

$(document).ready(function() {
	var list = localStorage.SimplistList;
	listLines = list.split("\n");
	for(line in listLines){
		$('#theirList').append('<li>' + listLines[line] + '</li>')
	}

	$('#day').change(function(){
		var index = $(this).val();
		$('#delivery').html(dayList[index]);
	})

	$('#formSubmit').click(function(){
		var empty = false;
		$('#contactForm input').each(function(){
			if($(this).val() == ''){
				empty = true;
				$(this).addClass('error');
			}
		});
		if(empty){
			$('.contactErrorMessage').show();
		} else{
			var emailString = $('#email').val()
			if(emailString.indexOf("@") == -1 || emailString.indexOf(".") == -1){
				$('#email').val('');
				$('#email').addClass('error');
				$('.contactErrorMessage').text("Please use a valid email address");
				$('.contactErrorMessage').show();
				return;
			}
			var addressString = $('#address').val() + ', ' + $('#city').val() + ', ' + $('#state').val() + ', ' + $('#zip').val();
			var data = {'firstName': $('#contactName').val().split(' ')[0], 'lastName': $('#contactName').val().split(' ').slice(1).join(' '), 'email': $('#email').val(), 'phone': $('#phone').val(), 'address': addressString, 'list': list, 'instructions': $('#instruct').val(), 'delivery': $('#day option:selected').text() + ' ' + $('#delivery option:selected').text(), 'time': $('#delivery').val()};
			console.log(data);
			
			$.ajax({
				url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/orderemail',
				method: 'POST',
				data: JSON.stringify(data),
				processData: false,
				contentType: 'application/json',
				success: function(data, status, xhr){
					window.location.href = 'confirmation.html';
				}
			});
			$('#contactOrder').hide();
			$('#contact').show();
			setInterval(processingGif, 1000);
			/*var a2 = $.ajax({
				url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/scheduler',
				method: 'POST',
				data: JSON.stringify(data),
				processData: false,
				contentType: 'application/json',
				success: function(data, status, xhr){
					
				}
			});*/
			
		}
	});

	$('#contactForm input').focus(function() {
		$(this).removeClass('error');
		$('.contactErrorMessage').hide();
		$('.contactErrorMessage').text("Please fill out highlighted fields");
	});

});

function processingGif(){
	var d = new Date().getSeconds();
	if(d%4 == 0){
		$('#processing').text('Processing.')
	}
	if(d%4 == 1){
		$('#processing').text('Processing..')
	}
	if(d%4 == 2){
		$('#processing').text('Processing...')
	}
	if(d%4 == 3){
		$('#processing').text('Processing.')
	}
}