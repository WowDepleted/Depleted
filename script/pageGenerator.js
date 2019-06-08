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
	var logo = "<a href=\"#\"><img src=\"./resources/depleted.png\"/></a>";
	divMainMenu.append("<ul><li>"+logo+"</li></ul>");
	var ul = divMainMenu.find("ul");
	$.each( data, function( raid, raidData ) {
		ul.append(tagDropdown.clone());
		var li = ul.find("li").last();
		
		tagDropbtn.html(raidData["RaidRealName"]);
		tagDropbtn.attr("href","#raid="+raid);
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

function generateStratPage(data,raidName,bossName){
	var divMainContent=$("#main-content");
	var divMainStrat = $("<div/>").attr("id","strat-main");
	var divHeader = $("<div/>").attr("id","strat-header");
	var divStrat = $("<div/>").attr("id","strat");
	divMainContent.append(divMainStrat);
	divMainStrat.append(divHeader)
				.append(divStrat);
				
	var bossRealName = "";
	var bossPicture = "./resources/"+raid+"/"+bossName+"/";
	$.each( data[raidName]["Boss"], function( boss, bossData ) {
		if(bossData["BossCode"] === bossName){
			bossRealName = bossData["BossRealName"];
			bossPicture+= bossData["Picture"];
		}
	});
	var divHeaderTitle = $("<div/>").append(bossRealName);
	var divHeaderImage = $("<img/>").attr("src",bossPicture);
	divHeader.append(divHeaderTitle)
			 .append(divHeaderImage);			
	
	var raidData = data[raidName];
	var stratData;
	$.each( raidData["Boss"], function( boss, bossData ) {
		if(bossData["BossCode"] == bossName){
			stratData = bossData["Strat"];
		}
	});
	
	var divCatName = $("<div/>").attr("class","cat-title");
	var divCatContent = $("<div/>").attr("class","cat-content");
	var divCatText = $("<div/>").attr("class","cat-text");
	var divCatImage = $("<img/>");
	
	$.each(stratData, function( index, partie ) {
		var divName = divCatName.clone()
					.append(partie["CatName"]);
		var divText = divCatText.clone()
					.append(partie["Text"]);
		var divContent = divCatContent.clone();
		if(partie["Pos"] === "left"){
			divContent.addClass("leftPicture");
		}
					
					
		var path = "./resources/"+raidName+"/"+bossName+"/"+partie["Picture"];
		var divImage = divCatImage.clone()
					.attr("src",path);
		
		divContent.append(divText);
		if(partie["Picture"].length > 0){
			divContent.append(divImage);
		}
		if(partie["CatName"].length > 0){
			divStrat.append(divName);
		}
		else{
			divStrat.append("<br>");
		}
		divStrat.append(divContent);
	});
}


function generatePageFromJson(menu=true){
	var pageName = getCurrentPage()
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
			raid = pageName.split("&")[0];
			boss = pageName.split("&")[1];
			generateStratPage(data,raid,boss);
		}
	});
}


$(document).ready(function(){
	generatePageFromJson(true);
});

$(window).on('hashchange', function(e){
	reloadPage();
});
