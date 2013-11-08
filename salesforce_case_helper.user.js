// ==UserScript==
// @name        new_salesforce_case_helper
// @namespace   salesforce.com
// @include     *
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource	Customcss case_helper.css 
// @version     1.2
// @grant		GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
var newCSS = GM_getResourceText ("Customcss");
GM_addStyle (newCSS);
window.addEventListener("load", Greasemonkey_main, false);

function Greasemonkey_main() {
	//load Open Sans font
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('link');
   script.rel = 'stylesheet';
   script.type= 'text/css';
   script.href= 'http://fonts.googleapis.com/css?family=Open+Sans:400,600';
   head.appendChild(script);
	function checkImportantFields(){
		var status = document.getElementById("cas7_ileinner").innerHTML;
		var natureOfIssueField = document.getElementById('00N50000002D2N9_ileinner');
		var rootCauseField = document.getElementById('00N50000002AgSu_ileinner');
		var relatedProductField = document.getElementById('00N50000002D2Rp_ileinner');
		var supportNotes = document.getElementById('00N50000001yx07_ileinner');
		var caseNotes = document.getElementById('00N50000002AHM3_ileinner');
		//update nature of issue, root cause, and related product fields
		if (natureOfIssueField.innerHTML === "&nbsp;") {
			$("#00N50000002D2N9_ileinner").addClass("status_negative");
		}else{
			$("#00N50000002D2N9_ileinner").addClass("status_positive");
		}
		if (rootCauseField.innerHTML === "&nbsp;") {
			$('#00N50000002AgSu_ileinner').addClass("status_negative");
		} else {
			$('#00N50000002AgSu_ileinner').addClass("status_positive");
		}
		if (relatedProductField.innerHTML === "&nbsp;") {
			$("#00N50000002D2Rp_ileinner").addClass("status_negative");
		} else {
			$("#00N50000002D2Rp_ileinner").addClass("status_positive");
		}
		//update status
		if (status === "New" || status === "In Progress" || status === "Assigned") {
			$('#cas7_ileinner').addClass("status_negative");
		} else if(status.substr(0,7) === "Pending") {
			$('#cas7_ileinner').addClass("pending");
		} else {
			$('#cas7_ileinner').addClass("status_positive");
		}
		//update support notes
		if (supportNotes.innerHTML !== ""){
			$('#00N50000001yx07_ileinner').addClass("status_important");
		}
		//update case notes
		if (caseNotes.innerHTML !== "&nbsp;"){
			$('#00N50000002AHM3_ileinner').addClass("status_important");
		}
		//update last comment, contact name, description
		$("#cas3_ileinner").addClass("beautified_comment");
		$("#cas15_ileinner").addClass("beautified_comment");
		$("#00N50000002CVE4_ileinner").addClass("beautified_comment");
		//fix container breaking
		document.getElementById('ep').style.maxWidth = window.innerWidth - 250 + "px";
		document.getElementById('bodyCell').style.maxWidth = window.innerWidth - 250 + "px";



	}
	function updateComments() {
		var comments = document.getElementsByClassName("dataCell");
		//beautify comments
		for(var i = 0; i < comments.length; i++){
			if (comments[i].innerHTML.substr(0,14) === "<b>Created By:"){
			comments[i].className += " " + "beautified_comment";
			}
		}
	}
	//get width for infobar
	var infoBar = document.createElement("div");
	infoBar.id = "infoBar";
	document.getElementsByTagName('body')[0].appendChild(infoBar);
	infoBar.style.width = window.innerWidth -6 + "px";
	//create and add JIRA button
	var jiraButton = document.createElement("input");
	jiraButton.id = "jiraButton";
	jiraButton.setAttribute("class","btn");
	jiraButton.setAttribute("type","button");
	jiraButton.setAttribute("name","JIRA");
	jiraButton.setAttribute("value","New JIRA");
	jiraButton.setAttribute("onclick","window.open(\"https://bits.bazaarvoice.com/jira/secure/Dashboard.jspa\",\"_blank\");");
	document.getElementById("topButtonRow").insertBefore(jiraButton,null);
	function createInfoBar(){
		var contactPhone, cluster, csdName, tamName;
		var clientName = document.getElementById('cas4_ileinner').childNodes[0].innerHTML;
		var caseTitle = document.getElementById('cas14_ileinner').innerHTML;
		var slaStatus = document.getElementById('00N50000002Cffz_ileinner').innerHTML;
		var ttfrStatus = document.getElementById('00N50000002DU7V_ileinner').innerHTML;
		var contactName = document.getElementById('cas3_ileinner').children[0].innerHTML;
		if(document.getElementById('cas9_ileinner').innerHTML !== "&nbsp;"){
			contactPhone = document.getElementById('cas9_ileinner').children[0].innerHTML;
			contactPhone = contactPhone.substr(contactPhone.indexOf('>')+1,1000);
			contactPhone = contactPhone.substr(0,contactPhone.indexOf('<'));
		}
		if(document.getElementById('00N50000001yzHK_ileinner').innerHTML !== "&nbsp;"){
			cluster = document.getElementById('00N50000001yzHK_ileinner').innerHTML.toUpperCase();
		}
		if(document.getElementById('00N50000001yTBP_ileinner').innerHTML !== "&nbsp;"){
			csdName = document.getElementById('00N50000001yTBP_ileinner').innerHTML;
		}
		if(document.getElementById('00N50000002D3bq_ileinner').innerHTML !== "&nbsp;"){
			tamName = document.getElementById('00N50000002D3bq_ileinner').innerHTML;
		}
		document.title = clientName+" - "+cluster+" - "+caseTitle + " - " + document.title.substr(0,14);
		$('#infoBar').append("<div class='infoBarCenter'>"+clientName+"<br>"+cluster+" - "+caseTitle+"</div>");
		$('#infoBar').append("<div class='infoBarLeft'> <span class='slaStatus'>"+"SLA Status: "+slaStatus+"</span><br>TTFR: "+ttfrStatus+"</div>");
		$('#infoBar').append("<div class='infoBarRight'>"+"Contact Name: "+contactName+"<br><img width='16' height='10' src='/img/btn_nodial_inline.gif'> "+contactPhone+"<br>CSD: "+csdName+" - TAM: "+tamName+"</div>");
		if (document.getElementById('00N50000002Cffz_ileinner').innerHTML !== "IN"){
			$(".slaStatus").css("color","#CD5C5C");
			if (document.getElementById('00N50000002Cffz_ileinner').innerHTML === "OUT"){
				$(".slaStatus").css("font-weight","900");
			}
		}
		


			

	}
	
checkImportantFields();

createInfoBar();
setTimeout(updateComments,3000);

}

$(window).scroll(function() {
if(window.scrollY < 120){
$('#infoBar').fadeOut();
} else{
$('#infoBar').fadeIn();
}
});