function generatePageFromJson(){
	var divMainContent=$("#main-content");
	console.log(divMainContent);
	
	$.getJSON( "./json.json", function( data ) {
		$.each( data, function( key, val ) {
			console.log(key + " - " + val);
		});
	});
}

$(document).ready(function(){
	generatePageFromJson();
});