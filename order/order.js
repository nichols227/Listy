editing = false;
editedItem = false;
count = 1;
currentID = '';
$(document).ready(function() {
	$('#addItem').click(function(){
		var empty = false;
		$('#addForm input').each(function(){
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
		$('.item').toggleClass('itemHighlight');
		if(editing){
			$('.remove').remove();
		} else {
			$('.item').prepend('<span class="remove">x</span>');
		}

		$('.remove').click(function(){
			$(this).parent().remove();
			event.stopPropagation();
		});

		$('.itemHighlight').click(function(){
			currentID = $(this).attr('id');
			$(this).addClass('editedItem');
			editedItem = true;
			$('#name').val($(this).find('.itemName').text());
			var split = $(this).find('.quantity').text().split(' ');
			$('#amount').val(split[0]);
			$('#quantity').val(split.slice(1).join(' '));
		})
		editing = !editing;
	});


})