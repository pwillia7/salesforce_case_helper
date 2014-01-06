// ==UserScript==
// @name        new_salesforce_case_helper
// @namespace   salesforce.com
// @include     https://na3.salesforce.com/* 
// @include     https://e2cp.na3.visual.force.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource	Customcss case_helper.css 
// @version     1.2
// @grant		GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
/*

Define your signature in the userSignature variable
Define your SoftServe Signature in the sendToSoftserve variable

\n is a carriage return (Enter/Return)

*/
var userSignature = "\n\nBest Regards,\n\nPatrick Williams";
var sendToSoftserve = "\n\nexternal communication: No\n\nPlease include a screenshot of the changes and a link to your userbranch's changeset if it's not promoted to staging.\n\nThanks,\n\nPatrick";


var newCSS = GM_getResourceText ("Customcss");

//this block runs on all salesforce case pages and all new comments page. Fixes word wrap issue, adds signature buttons and floats WorkIt!
GM_addStyle (newCSS);
if(document.location.origin === 'https://e2cp.na3.visual.force.com'){
	window.addEventListener("load", Greasemonkey_main1, false);}
function Greasemonkey_main1(){
	var commentRow = document.getElementById('pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:cannedPBSI:cannedOP');
	var signatureButton = document.createElement('input');
	signatureButton.id = 'signatureButton';
	signatureButton.setAttribute('class','btn');
	signatureButton.setAttribute('type','button');
	signatureButton.setAttribute('name','signatureButton');
	signatureButton.setAttribute('value','Add Signature');

	var softserveButton = document.createElement('input');
	softserveButton.id = 'softserveButton';
	softserveButton.setAttribute('class','btn');
	softserveButton.setAttribute('type','button');
	softserveButton.setAttribute('name','sendToSoftserve');
	softserveButton.setAttribute('value','SS Signature');

	commentRow.insertBefore(signatureButton,null);
	commentRow.insertBefore(softserveButton,null);

	document.getElementById('softserveButton').onclick = function(){document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += sendToSoftserve;};
	document.getElementById('signatureButton').onclick = function(){document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += userSignature;};

}//end block

//This block will run on all Support Case Types
if(document.getElementById('RecordType_ileinner').innerHTML.substr(0,12) === "Support Team"){
window.addEventListener("load", Greasemonkey_main, false);}
function Greasemonkey_main() {
	//load Open Sans font
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('link');
   script.rel = 'stylesheet';
   script.type= 'text/css';
   script.href= 'http://fonts.googleapis.com/css?family=Open+Sans:400,600';
   head.appendChild(script); //end font

   //This function updates the important fields with color depending on their values
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
		document.getElementById('cas15_ileinner').style.maxWidth = window.innerWidth - 250 + "px";
	}

	//updates case comments to be more readable
	function updateComments() {
		var comments = document.getElementsByClassName("dataCell");
		//beautify comments
		for (var i = 0; i < comments.length; i++){
			if (comments[i].innerHTML.substr(0,14) === "<b>Created By:"){
			comments[i].className += " beautified_comment";
			}
		}
	}
	
	//create infobar container
	var infoBar = document.createElement("div");
	infoBar.id = "infoBar";
	document.getElementsByTagName('body')[0].appendChild(infoBar);
	infoBar.style.width = "99%";

	//create and add JIRA button
	var jiraButton = document.createElement("input");
	jiraButton.id = "jiraButton";
	jiraButton.setAttribute("class","btn");
	jiraButton.setAttribute("type","button");
	jiraButton.setAttribute("name","JIRA");
	jiraButton.setAttribute("value","New JIRA");
	jiraButton.setAttribute("onclick","window.open(\"https://bits.bazaarvoice.com/jira/secure/Dashboard.jspa\",\"_blank\");");
	document.getElementById("topButtonRow").insertBefore(jiraButton,null);

	//populate infobar
	function createInfoBar(){
		var contactPhone, cluster, csdName, tamName, caseCreationDate;
		var currentLocalDate = new Date();
		var clientName = document.getElementById('cas4_ileinner').childNodes[0].innerHTML;
		var caseTitle = document.getElementById('cas14_ileinner').innerHTML;
		var slaStatus = document.getElementById('00N50000002Cffz_ileinner').innerHTML;
		var ttfrStatus = document.getElementById('00N50000002DU7V_ileinner').innerHTML;
		var contactName = document.getElementById('cas3_ileinner').children[0].innerHTML;
		if(document.getElementById('cas9_ileinner').innerHTML.length > 15){
			contactPhone = document.getElementById('cas9_ileinner').children[0].innerHTML;
			contactPhone = contactPhone.substr(contactPhone.indexOf('>')+1,1000);
			contactPhone = contactPhone.substr(0,contactPhone.indexOf('<'));
		} else if (document.getElementById('cas9_ileinner').innerHTML !== "&nbsp;"){
			contactPhone = document.getElementById('cas9_ileinner').innerHTML;
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

		//check for milestone
		var iDateDiff, milestoneTTCR, TTCRInfo, milestoneBodyID;
		var milestoneListID = document.getElementsByClassName('listHoverLinks')[0].children[0].id;
		milestoneBodyID = milestoneListID.substr(0,milestoneListID.length-4);
		milestoneBodyID += "body";
		if(document.getElementById(milestoneBodyID).children[0].children[0].children[0].children[0].innerHTML !== "No records to display"){
			milestoneTTCR = document.getElementById(milestoneBodyID).children[0].children[0].children[1].children[3].innerHTML;
		}
		//if there is a milestone, add remaining time or TTFR time to infobar
		if(milestoneTTCR !== undefined){
			TTCRInfo = "Time Remaining: ";
			TTCRInfo += milestoneTTCR;
			if(milestoneTTCR === "00:00"){
				slaStatus = "OUT";
			} else if(milestoneTTCR.substr(0,milestoneTTCR.length -3) < 17){
				slaStatus = "ALMOST";
			} else {
				slaStatus = "IN";
			}
        } else{ //if no milestones, calculate business days open
			//convert user to central time
			if(new Date().getTimezoneOffset() !== 360){ // if not in central time
				var currentOffset = new Date().getTimezoneOffset();
				var cstOffset = 360 - currentOffset; //calculate offset between cst and local time
				currentLocalDate =  new Date(currentLocalDate.getFullYear(),currentLocalDate.getMonth(),currentLocalDate.getDate(),currentLocalDate.getHours(),currentLocalDate.getMinutes()-cstOffset,currentLocalDate.getSeconds()); //calculate current central time and set local date to that
			}
			// Calculate business days since creation date
			if(document.getElementById('00N50000002CaYE_ileinner').innerHTML === "&nbsp;"){
				caseCreationDate = new Date(document.getElementById('CreatedDate_ileinner').innerHTML);
			} else {
				caseCreationDate = new Date(document.getElementById('00N50000002CaYE_ileinner').innerHTML);
			}
			var iWeeks, iAdjust = 0;
			if (currentLocalDate < caseCreationDate) return -1; // error code if dates transposed
			var iWeekday1 = caseCreationDate.getDay(); // day of week
			var iWeekday2 = currentLocalDate.getDay();
			iWeekday1 = (iWeekday1 === 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
			iWeekday2 = (iWeekday2 === 0) ? 7 : iWeekday2;
			if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
			iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
			iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;
			// calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
			iWeeks = Math.floor((currentLocalDate.getTime() - caseCreationDate.getTime()) / 604800000);
			if (iWeekday1 <= iWeekday2) {
				iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1);
			} else {
				iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2);
			}
			iDateDiff -= iAdjust; // take into account both days on weekend;
			iDateDiff += " Business Days Open";
			TTCRInfo = "TTCR: ";
			TTCRInfo += iDateDiff;
			}
        //add data to infobar
		document.title = clientName+" - "+cluster+" - "+caseTitle + " - " + document.title.substr(0,14);
		$('#infoBar').append("<div class='infoBarCenter'>"+clientName+"<br>"+cluster+" - "+caseTitle+"</div>");
		$('#infoBar').append("<div class='infoBarLeft'> <span class='slaStatus'>"+"SLA Status: "+slaStatus+"<br>"+TTCRInfo+"</span><br>TTFR: "+ttfrStatus+"</div>");
		$('#infoBar').append("<div class='infoBarRight'>"+"Contact Name: "+contactName+"<br><img width='16' height='10' src='/img/btn_nodial_inline.gif'> "+contactPhone+"<br>CSD: "+csdName+" - TAM: "+tamName+"</div>");
		if (slaStatus !== "IN"){
			$(".slaStatus").css("color","#CD5C5C");
			if (slaStatus === "OUT"){
				$(".slaStatus").css("font-weight","900");
			}
		}
	} //end createInfoBar

checkImportantFields();

//try to populate infoBar until successful
var infoBarInterval = setInterval(function(){
	try{
		createInfoBar();
		clearInterval(infoBarInterval);
	} catch(e){}},500);

//try to update comments until successful
var updateCommentsInterval = setInterval(function(){
	try{
		updateComments();
		clearInterval(updateCommentsInterval);
	} catch(e){}},1200);

}//end block

//Hide infoBar when at top of page
$(window).scroll(function() {
if(window.scrollY < 120){
$('#infoBar').fadeOut();
} else{
$('#infoBar').slideDown();
}
});
