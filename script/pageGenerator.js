function generateMenu(data){
	var tagDropdown = $("<li/>").addClass("dropdown");
	var tagDropbtn = $("<a/>").addClass("dropbtn");
	var tagDropdownContent = $("<div/>").addClass("dropdown-content");
	
	var divMainMenu=$("#navigation-menu");
	divMainMenu.append("<ul></ul>");
	var ul = divMainMenu.find("ul");
	$.each( data, function( raid, val ) {
		ul.append(tagDropdown.clone());
		var li = ul.find("li").last();
		
		tagDropbtn.html(val["RaidRealName"]);
		li.append(tagDropbtn.clone())
		li.append(tagDropdownContent.clone());
		var dropdown = li.find("div");
		
		console.log(val["Boss"]);
		$.each( val["Boss"], function( boss, bossValues ) {
			dropdown.append("<a href=\"#\">"+bossValues["BossRealName"]+"</a>");
		});
	});
}

function generateIndexPage(data){}

function generatePageFromJson(){
	var divMainContent=$("#main-content");
	
	console.log(divMainContent);
	
	var jsonLink = "https://raw.githubusercontent.com/WowDepleted/Depleted/master/json.json"
	
	$.getJSON( jsonLink, function( data ) {
		generateMenu(data);
		if(pageName==="index"){
			generateIndexPage(data);
		}
		else{
			console.log("TODO: boss strat page");
		}
	});
}

$(document).ready(function(){
	generatePageFromJson();
});