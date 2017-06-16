// ==UserScript==
// @name        new_salesforce_case_helper
// @namespace   salesforce.com
// @include     https://bazaarvoice1.my.salesforce.com/* 
// @include     https://bazaarvoice1--e2cp.na3.visual.force.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource	Customcss case_helper.css 
// @version     1.3
// @grant		GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
/*

Define your signature in the userSignature variable
Define your SoftServe Signature in the sendToSoftserve variable

\n is a carriage return (Enter/Return)

*/
var userSignature = "Best regards,\nBob Weilbaecher | Technical Success Manager | 512.551.6818\n\n———\nIf you have a critical issue at any time of day or night - defined as a total outage of submission or display on production - please call our support hotline at 866-522-9227 (choose option 4) and someone will assist you.";
var sendToSoftserve = "\n\nexternal communication: No\n\nPlease include a screenshot of the changes and a link to your userbranch's changeset if it's not promoted to staging.\n\nThanks,\n\nBob";


var newCSS = GM_getResourceText ("Customcss");

//this block runs on all salesforce case pages and all new comments page. Fixes word wrap issue, adds signature buttons and floats WorkIt!
GM_addStyle (newCSS);
if(document.location.origin === 'https://bazaarvoice1--e2cp.na3.visual.force.com'){
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
   script.href= 'https://fonts.googleapis.com/css?family=Open+Sans:400,600';
   head.appendChild(script); //end font

   //This function updates the important fields with color depending on their values
	function checkImportantFields(){
		var status = document.getElementById("cas7_ileinner").innerHTML;
		var natureOfIssueField = document.getElementById('00N50000002D2N9_ileinner');
		var rootCauseField = document.getElementById('00N50000002AgSu_ileinner');
		var relatedProductField = document.getElementById('00N50000002D2Rp_ileinner');
        var accountSupportGroupField = document.getElementById('00N50000003fP3z_ileinner');
		var primaryTSMConversationsField = document.getElementById('00N50000009s6XR_ileinner');
		var primaryTSMPRRField = document.getElementById('00N50000009s6XW_ileinner');
        var caseOriginField = document.getElementById('cas11_ileinner');
		var caseNotes = document.getElementById('00N50000002AHM3_ileinner');
		//update nature of issue, root cause, and related product fields
        console.log('Checking fields . . .');
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
        if (caseOriginField.innerHTML === "&nbsp;") {
			$("#cas11_ileinner").addClass("status_negative");
		} else {
			console.log('Case Origin is present');
		}
        console.log('primaryTSMConversationsField.innerHTML = *',primaryTSMConversationsField.innerHTML,'* it is ',primaryTSMConversationsField.innerHTML.length,' character(s) long');
		if (primaryTSMConversationsField.innerHTML === " ") {
			console.log('No Primary Conversations TSM');
		} else {
			$('#00N50000009s6XR_ileinner').addClass("status_positive");
		}
        console.log('primaryTSMPRRField.innerHTML = *',primaryTSMPRRField.innerHTML,'* it is ',primaryTSMPRRField.innerHTML.length,' character(s) long');
		if (primaryTSMPRRField.innerHTML === " ") {
			console.log('No Primary PRR TSM');
		} else {
			$('#00N50000009s6XW_ileinner').addClass("status_positive");
		}
		if (accountSupportGroupField.innerHTML === "&nbsp;") {
			$("#00N50000003fP3z_ileinner").addClass("status_negative");
		} else {
			$("#00N50000003fP3z_ileinner").addClass("status_positive");
		}
		//update status
		if (status === "New" || status === "In Progress" || status === "Assigned") {
			$('#cas7_ileinner').addClass("status_negative");
		} else if(status.substr(0,7) === "Pending") {
			$('#cas7_ileinner').addClass("pending");
		} else {
			$('#cas7_ileinner').addClass("status_positive");
		}
		//update case notes
		if (caseNotes.innerHTML !== "&nbsp;"){
			$('#00N50000002AHM3_ileinner').addClass("status_important");
		}
		//update last comment, contact name, description
		$("#cas3_ileinner").addClass("beautified_comment");
		$("#cas15_ileinner").addClass("beautified_comment");
		//fix container breaking
		document.getElementById('ep').style.maxWidth = window.innerWidth - 250 + "px";
		document.getElementById('bodyCell').style.maxWidth = window.innerWidth - 250 + "px";
		document.getElementById('cas15_ileinner').style.maxWidth = window.innerWidth - 250 + "px";
	}
		var placeDiv = true;
	function descriptionImage(){
			var description = document.getElementById('cas15_ileinner').innerHTML;
		var creationDate = document.getElementById('CreatedDate_ileinner').innerHTML;
		if(description.indexOf('[cid:')!= -1){
			var descnumOccurs = description.split('[cid:').length -1;
				for(var z = 0; z <= descnumOccurs; z++){
				var dateString = 0;
				var descimagePos = description.indexOf('[cid:');
				var descimagePosEnd = description.indexOf(']',descimagePos);
				var descstr = description.substr(descimagePos,descimagePosEnd-descimagePos+1);//this is the full html that needs to be replaced
				var descimageName = descstr.substr(descstr.indexOf(':')+1,descstr.indexOf('@')-descstr.indexOf(':')-1);
				var adjusteddescimageName = descimageName.split('<a href=\"mailto:').pop();
				var descanchors = document.getElementsByClassName('actionLink');
				for(var w = 0; w <= descanchors.length; w++){
					if(descanchors[w].title.indexOf(adjusteddescimageName) != -1 && descanchors[w].target === "_blank" && descanchors[w].parentNode.parentNode.children[4].innerHTML === creationDate){
							console.log('something fit this desc');
							var descimageSrc = descanchors[w].href;
							document.getElementById('cas15_ileinner').innerHTML = document.getElementById('cas15_ileinner').innerHTML.replace(descstr,"<div style='max-width:100%'><a target='_blank' href='"+descimageSrc+"'><img style='max-width:100%' src='"+descimageSrc+"'></a></div>");
						}
					}
		}}
	}
	//updates case comments to be more readable
	function updateComments() {
		var viewImages = "javascript:RelatedList.get('" + document.location.pathname.substr(1) + "_RelatedAttachmentList').showXMore(100)";
		var hiddenBtn = document.createElement('a');
		hiddenBtn.id = "hiddenBtn";
		hiddenBtn.href = viewImages;
		hiddenBtn.style.visibility = "hidden";
		if(placeDiv === true){
			document.getElementById('sessiontimeout').insertBefore(hiddenBtn,null);
			placeDiv = false;

		}


		var comments = document.getElementsByClassName("dataCell");
		//beautify comments & add images
		for (var i = 0; i < comments.length; i++){
			if (comments[i].innerHTML.substr(0,14) === "<b>Created By:"){
				comments[i].className += " beautified_comment";
				//get Date of Comment
				var dateStart = comments[i].innerHTML.indexOf('(')+1;
				var dateLength = comments[i].innerHTML.indexOf(')') - dateStart;
				var commentDate = comments[i].innerHTML.substr(dateStart,dateLength);
				if(comments[i].innerHTML.indexOf('[cid:')!= -1){ //change to while?
					var numOccurs = comments[i].innerHTML.split('[cid:').length -1;
					for(var k = 0; k <= numOccurs; k++){
					var imagePos = comments[i].innerHTML.indexOf('[cid:');
					var imagePosEnd = comments[i].innerHTML.indexOf(']',imagePos);
					var str = comments[i].innerHTML.substr(imagePos,imagePosEnd-imagePos+1);
					var imageName = str.substr(str.indexOf(':')+1,str.indexOf('@')-str.indexOf(':')-1);
					console.log(imageName);
					var anchors = document.getElementsByClassName('actionLink');
					for(var j = 0; j < anchors.length; j++){
						if(anchors[j].title.indexOf(imageName) != -1 && anchors[j].target === "_blank" && anchors[j].parentNode.parentNode.children[4].innerHTML === commentDate){
							document.getElementById('hiddenBtn').click();console.log('click');
							var imageSrc = anchors[j].href;
							comments[i].innerHTML = comments[i].innerHTML.replace(str,"<div style='max-width:100%'><a target='_blank' href='"+imageSrc+"'><img style='max-width:100%' src='"+imageSrc+"'></a></div>");
						}
					}
				}}
			}
		}
	}
	//create infobar container
	var infoBar = document.createElement("div");
	infoBar.id = "infoBar";
	document.getElementsByTagName('body')[0].appendChild(infoBar);
	infoBar.style.width = "99%";
    infoBar.style.height = "55px";
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
		// FIX THIS! NEEDS MATHS TO DETERMINE IF IN OR OUT
		var bvTime = document.getElementById('00N50000002yQKN_ileinner').innerHTML;
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
			milestoneTTCR = document.getElementById(milestoneBodyID).children[0].children[0].children[2].children[3].innerHTML;
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
			
				caseCreationDate = new Date(document.getElementById('CreatedDate_ileinner').innerHTML);
			
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
		$('#infoBar').append("<div class='infoBarLeft'> <span class='slaStatus'>"+"SLA Status: "+slaStatus+"<br>"+TTCRInfo+"</span><br>Version 1.3</div>");
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
//window.onload = setTimeout(updateComments,1200);
var intCount = 0;
var updateCommentsInterval = setInterval(function(){
	updateComments();
	descriptionImage();
	intCount++;
	if(document.getElementsByClassName('beautified_comment').length > 3 || intCount === 12){
		clearInterval(updateCommentsInterval);
	}
	},100);

}//end block
//Hide infoBar when at top of page
$(window).scroll(function() {
if(window.scrollY < 120){
$('#infoBar').fadeOut();
} else{
$('#infoBar').slideDown();
}
});
