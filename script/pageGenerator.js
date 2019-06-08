var jsonLink = "https://raw.githubusercontent.com/WowDepleted/Depleted/master/json.json"

function reloadPage(){
	cleanPage();
	generatePageFromJson(false);
}

function cleanPage(){
	$("#main-content").text("");
}


function getCurrentPage(){
	var url = window.location.href;
	console.log(url);
	if (url.indexOf('#') == -1) {
		return "index";
	}
	var args = url.split("#")[1];
	if(args.length ===0){
		return "index";
	}
	
	
	console.log(args);
}

function generateMenu(data){
	var tagDropdown = $("<li/>").addClass("dropdown");
	var tagDropbtn = $("<a/>").addClass("dropbtn").click(reloadPage);
	var tagDropdownContent = $("<div/>").addClass("dropdown-content");
	
	var divMainMenu=$("#navigation-menu");
	divMainMenu.append("<ul></ul>");
	var ul = divMainMenu.find("ul");
	$.each( data, function( raid, raidVal ) {
		ul.append(tagDropdown.clone());
		var li = ul.find("li").last();
		
		tagDropbtn.html(raidVal["RaidRealName"]);
		li.append(tagDropbtn.clone())
		li.append(tagDropdownContent.clone());
		var dropdown = li.find("div");
		$.each( raidVal["Boss"], function( boss, bossVal ) {
			var link = "#raid="+raid+"&boss="+bossVal["BossCode"];
			dropdown.append("<a href=\""+link+"\">"+bossVal["BossRealName"]+"</a>");
		});
	});
}

function generateIndexPage(data){
	var divMainContent=$("#main-content");
	var gallery = $("<div/>").attr("id","gallery");
	divMainContent.append(gallery);
	var contentBox = $("<a/>").click(reloadPage);
	var name = $("<div/>") ;
	var picture = $("<img/>");
	$.each( data, function( raid, raidData ) {
		var path = "./resources/"+raid+"/"+raidData["Picture"]
		var raidPicture = picture.clone().attr("src",path);
		var raidName = raidData["RaidRealName"];
		var currentBox = contentBox.clone()
							.append(raidPicture)
							.append(raidName);
		currentBox.attr("href","#raid="+raid);
		gallery.append(currentBox);
	});
}

function generateReloadOnClick(){


}

function generatePageFromJson(menu=true){
	var pageName = getCurrentPage()
	
	$.getJSON( jsonLink, function( data ) {
		if(menu)
			generateMenu(data);
		if(pageName==="index"){
			generateIndexPage(data);
		}
		else{
			console.log("TODO: boss strat page");
		}
	});
	
	generateReloadOnClick();
}


$(document).ready(function(){
	generatePageFromJson(true);
});

$(window).on('hashchange', function(e){
	reloadPage();
});
