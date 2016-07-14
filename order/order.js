var editing = false;
var editedItem = false;
var count = 1;
var currentID = '';
var textbox = false;
var list;
$.ajax({
	url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/scheduler',
	method: 'GET',
	success: function(data, status, xhr){
		console.log(data);
		timeArr = $.parseJSON(data);
		for (var i = 0; i < timeArr.length; i++) {
			var time = timeArr[i];
			var count = time[1]
			var time = parseInt(time[0].split(' ')[1].split(':')[0]);
			var am = 'AM';
			var optionString = '<option value="' + time +'" ';
			if(count >=2){
				optionString += 'disabled';
			}
			if(time > 12){
				am = 'PM';
				time -= 12;
			}
			optionString += '>' + time + ':00 ' + am + ' - ';
			if(time == 12){
				optionString += '1:00 PM</option>';
			} else {
				optionString += (time + 1) + ":00 " + am + "</option>";
			}
			$('#delivery').append(optionString)
		}
	}
})

$(document).ready(function() {
	$('#addItem').click(function(){
		var empty = false;
		$('#addForm input[required]').each(function(){
			if($(this).val() == ''){
				empty = true;
				$(this).addClass('error');
			}
		});
		if(empty){
			$('.errorMessage').show();
		} else if(editedItem){
			$(currentID).find('.itemName').html($('#name').val());
			$(currentID).find('.quantity').html($('#amount').val() + ' ' + $('#quantity').val());
			editedItem = false;
			$(currentID).removeClass('editedItem');
			$('#addItem').text('Add Item');
			$('#addForm input').each(function(){
				$(this).val('');
			});
		} else {
			var newItem;
			if(editing){
				newItem = '<div class="item itemHighlight" id="item' + count + '"><span class="remove">x</span>'
			} else {
				newItem = '<div class="item" id="item' + count + '">';
			}
			newItem += '<span class="itemName">' + $('#name').val() +'</span><span class="quantity">' + $('#amount').val() + ' ' + $('#quantity').val() + '</span></div>';
			$('#listContainer').append(newItem);
			$('#addForm input').each(function(){
				$(this).val('');
			});
			count += 1;
		}
	});

	$('#addForm input').focus(function() {
		$(this).removeClass('error');
		$('.errorMessage').hide();
	});

	$('#editList').click(function() {
		if($('#listContainer').is(':empty')){
			return;
		}
		$('.item').toggleClass('itemHighlight');
		$('.editedItem').removeClass('editedItem');
		if(editing){
			$('.remove').remove();
		} else {
			$('.item').prepend('<span class="remove">x</span>');
		}

		$('.remove').click(function(){
			$(this).parent().remove();
			event.stopPropagation();
			if($('#listContainer').is(':empty')){
				editing = false
			}
		});

		$('.itemHighlight').click(function(){
			$('.editedItem').removeClass('editedItem');
			currentID = '#' + $(this).attr('id');
			$(this).addClass('editedItem');
			$('#addItem').text('Edit Item');
			editedItem = true;
			$('#name').val($(this).find('.itemName').text());
			var split = $(this).find('.quantity').text().split(' ');
			$('#amount').val(split[0]);
			$('#quantity').val(split.slice(1).join(' '));
		})
		editing = !editing;
	});

	$('#switch').click(function(){
		if(textbox){
			$('#textList').hide();
			$('#editList').show();
			$('#add').show();
			$('#listContainer').show();
			$(this).text('Use a textbox instead');
		} else {
			$('#textList').show();
			$('#editList').hide();
			$('#add').hide();
			$('#listContainer').hide();
			$(this).text('Use a form instead');
		}
		$('#list').toggleClass('list');
		$('#list').toggleClass('listAlone');
		textbox = !textbox;
	});

	$('#sendList').click(function(){
		if(textbox){
			list = $('#textList').val();
		} else {
			list = '';
			$('.item').each(function(){
				list += $(this).find('.itemName').text() + ' - ' + $(this).find('.quantity').text() + '\n';
			});
		}
		$('.change').hide();
		$('#order').hide();
		$('#rules').hide();
		$('#contactInfo').show();		
	});

	$('#goBack').click(function(){
		$('.change').show();
		$('#order').show();
		$('#rules').show()
		$('#contactInfo').hide();

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
			var data = {'name': $('#contactName').val(), 'email': $('#email').val(), 'phone': $('#phone').val(), 'address': addressString, 'list': list, 'instructions': $('#instruct').val(), 'delivery': $('#delivery').val()};
			console.log(data);
			$.ajax({
				url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/orderemail',
				method: 'POST',
				data: JSON.stringify(data),
				processData: false,
				contentType: 'application/json'
			});
			$.ajax({
				url: 'https://5bbcf67vw1.execute-api.us-west-2.amazonaws.com/test/scheduler',
				method: 'POST',
				data: JSON.stringify({'time': $('#delivery').val()}),
				processData: false,
				contentType: 'application/json',
				success: function(data, status, xhr){
					window.location.href = 'confirmation.html';
				},
				beforeSend: function(xhr, settings){
					$('button').prop('disabled', true);
				}
			});
			
		}
	});

	$('#contactForm input').focus(function() {
		$(this).removeClass('error');
		$('.contactErrorMessage').hide();
		$('.contactErrorMessage').text("Please fill out highlighted fields");
	});

})