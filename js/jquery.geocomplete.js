jQuery().ready(function () {
	var input = document.getElementsByClassName('geocomplete')[0].getElementsByTagName('input')[0];
	if (typeof(google) != 'undefined')
		var autocomplete = new google.maps.places.Autocomplete(input);

});
