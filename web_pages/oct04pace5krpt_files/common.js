document.writeln("<div style='padding:10px 20px; background:#00599b; color:#fff; font:18px Verdana, Helvetica, Arial;'>You have reached the former Washington Running Report Web site. <a href='http://www.runwashington.com/' style='color:#fff;'>Click here to see the new site!</a></div>");

function goto_URL(object) { 
	if (object.options[object.selectedIndex].value != "nada") 
		window.location.href = object.options[object.selectedIndex].value;  
} 

function goto_parentURL(object) { 
	if (object.options[object.selectedIndex].value != "nada") 
		parent.location.href = object.options[object.selectedIndex].value;  
} 

		
function makeArray() { 
	for (i = 0; i < makeArray.arguments.length; i++)  
		this[i + 1] = makeArray.arguments[i];  
} 

var months = new makeArray('01','02','03','04','05','06','07','08','09','10','11','12'); 
var date = new Date(); 
var day  = date.getDate(); 
var month = date.getMonth() + 1; 
var yy = date.getYear(); 
var year = (yy < 1000) ? yy + 1900 : yy; 


// DOUBLECLICK ORD
// doubleclick ord will be like: yyyy.mm.dd.hh.mm.ss?
	
	var hh = date.getHours();
	var mm = date.getMinutes();
	var ss = date.getSeconds();

	var pgDblclkOrd = "";
	pgDblclkOrd += year + ".";
	pgDblclkOrd += month + ".";
	pgDblclkOrd += day + ".";
	pgDblclkOrd += hh + ".";
	pgDblclkOrd += mm + ".";
	pgDblclkOrd += ss + "";

		
if(navigator.appName == "Netscape") {
	origWidth=innerWidth;
	origHeight=innerHeight; 
	
	onresize=function() {if(innerWidth!=origWidth||innerHeight!=origHeight)location.reload()}
}
