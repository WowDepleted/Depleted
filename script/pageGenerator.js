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
		$.each( val["Boss"], function( boss, bossValues ) {
			dropdown.append("<a href=\"#\">"+bossValues["BossRealName"]+"</a>");
		});
	});
}

function generateIndexPage(data){
	var divMainContent=$("#main-content");
	var gallery = $("<div/>").attr("id","gallery");
	divMainContent.append(gallery);
	var contentBox = $("<div/>");
	var name = $("<div/>") ;
	var picture = $("<img/>");
	$.each( data, function( raid, raidData ) {
		var path = "./resources/"+raid+"/"+raidData["Picture"]
		var raidPicture = picture.clone().attr("src",path);
		var raidName = raidData["RaidRealName"];
		var currentBox = contentBox.clone()
							.append(raidPicture)
							.append(raidName);
		gallery.append(currentBox);
	});
}

function generatePageFromJson(){
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