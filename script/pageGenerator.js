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
	if(url.indexOf('&') == -1){
		return args.split("=")[1];
	}
	var raid = args.split("&")[0].split("=")[1];
	var boss = args.split("&")[1].split("=")[1];
	return raid+"&"+boss;
	
}

function generateMenu(data){
	var tagDropdown = $("<li/>").addClass("dropdown");
	var tagDropbtn = $("<a/>").addClass("dropbtn").click(reloadPage);
	var tagDropdownContent = $("<div/>").addClass("dropdown-content");
	
	var divMainMenu=$("#navigation-menu");
	divMainMenu.append("<ul></ul>");
	var ul = divMainMenu.find("ul");
	$.each( data, function( raid, raidData ) {
		ul.append(tagDropdown.clone());
		var li = ul.find("li").last();
		
		tagDropbtn.html(raidData["RaidRealName"]);
		li.append(tagDropbtn.clone())
		li.append(tagDropdownContent.clone());
		var dropdown = li.find("div");
		$.each( raidData["Boss"], function( boss, bossData ) {
			var link = "#raid="+raid+"&boss="+bossData["BossCode"];
			dropdown.append("<a href=\""+link+"\">"+bossData["BossRealName"]+"</a>");
		});
	});
}

function generateIndexPage(data, isRaid=""){
	var divMainContent=$("#main-content");
	var gallery = $("<div/>").attr("id","gallery");
	divMainContent.append(gallery);
	var contentBox = $("<a/>").click(reloadPage);
	var name = $("<div/>") ;
	var picture = $("<img/>");
	$.each( data, function( raid, raidData ) {
		if(isRaid.length === 0){
			var path = "./resources/"+raid+"/"+raidData["Picture"]
			var raidPicture = picture.clone().attr("src",path);
			var raidName = raidData["RaidRealName"];
			var currentBox = contentBox.clone()
								.append(raidPicture)
								.append(raidName);
			currentBox.attr("href","#raid="+raid);
			gallery.append(currentBox);
		}
		else{
			if(isRaid == raid){
				$.each( raidData["Boss"], function( boss, bossData ) {
					var path = "./resources/"+raid+"/"+bossData["BossCode"]+"/"+bossData["Picture"];
					var raidPicture = picture.clone().attr("src",path);
					var raidName = bossData["BossRealName"];
					var currentBox = contentBox.clone()
									.append(raidPicture)
									.append(raidName);
					currentBox.attr("href","#raid="+raid+"&boss="+bossData["BossCode"]);
					gallery.append(currentBox);
				});
			}
		}
	});
}

function generateRaidPage(data){
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

function generatePageFromJson(menu=true){
	var pageName = getCurrentPage()
	console.log(pageName);
	$.getJSON( jsonLink, function( data ) {
		if(menu)
			generateMenu(data);
		if(pageName==="index"){
			generateIndexPage(data);
		}
		else if(pageName.indexOf("&") == -1){
			generateIndexPage(data,pageName);
		}
		else{
			console.log("TODO: boss strat page");
		}
	});
}


$(document).ready(function(){
	generatePageFromJson(true);
});

$(window).on('hashchange', function(e){
	reloadPage();
});
