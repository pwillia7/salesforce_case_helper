// ==UserScript==
// @name        new_salesforce_case_helper
// @namespace   salesforce.com
// @include     https://bazaarvoice1.my.salesforce.com/*
// @include     https://bazaarvoice1--e2cp.na3.visual.force.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource    Customcss case_helper.css
// @version     2.0
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
/*
Define your signature in the userSignature variable
Define your SoftServe Signature in the sendToSoftserve variable
\n is a carriage return (Enter/Return)
*/
if(document.getElementsByClassName('bPageTitle')[0]){
    var caseNumber = document.getElementsByClassName('bPageTitle')[0].innerText.split('').splice(6,8).join('');
}

// business day calculator
function businessDaysFromDate(businessDays) {
  var counter = 0, tmp = new Date(), origTime = tmp.getTime();
  var yr = tmp.getFullYear();
  var easter = computus(yr);
  var goodFriday = easter;
  goodFriday.setDate(goodFriday.getDate()-2);
  var gfM = goodFriday.getMonth()+1;
  var gfD = goodFriday.getDate();
  var gfStr = gfM + '/'+gfD;
  var easterMonday = goodFriday;
  easterMonday.setDate(easterMonday.getDate()+3);
  var emM = easterMonday.getMonth()+1;
  var emD = easterMonday.getDate();
  var emStr = emM+'/'+emD;
  var ascensionThursday = easterMonday;
  ascensionThursday.setDate(ascensionThursday.getDate()+38);
  var atM = ascensionThursday.getMonth()+1;
  var atD = ascensionThursday.getDate();
  var atStr = atM+'/'+atD;
  var whitMonday = ascensionThursday;
  whitMonday.setDate(whitMonday.getDate()+11);
  var wmM = whitMonday.getMonth()+1;
  var wmD = whitMonday.getDate();
  var wmStr = wmM+'/'+wmD;
  var corpusChristi = whitMonday;
  corpusChristi.setDate(corpusChristi.getDate()+10);
  var ccM = corpusChristi.getMonth()+1;
  var ccD = corpusChristi.getDate();
  var ccStr = ccM+'/'+ccD;
  while( businessDays>=0 ) {
    console.log('businessDays: ',businessDays);
    tmp.setTime( origTime + counter * 86400000 );
    if(isBusinessDay (tmp,gfStr,emStr,atStr,wmStr,ccStr)) {
      --businessDays;
    }
    ++counter;
  }
  return tmp;
}
function isBusinessDay (date,gfStr,emStr,atStr,wmStr,ccStr) {
  var dayOfWeek = date.getDay();
  if(dayOfWeek === 0 || dayOfWeek === 6) {
    // Weekend
    console.log('weekend - return false');
    return false;
  }
  // Uncomment out the holiday of your country - it is United States by default
  // United States
  // comment this out if you are chossing another country

  holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '1-3/1',   // Birthday of Martin Luther King, third Monday in January
    '2-3/1',   // Washington's Birthday, third Monday in February
    '5~1/1',   // Memorial Day, last Monday in May
    '7/3+5',   // Independence Day
    '7/4',     // Independence Day
    '7/5+1',   // Independence Day
    '9-1/1',   // Labor Day, first Monday in September
    '11-4/4',  // Thanksgiving Day, fourth Thursday in November
    '11-4/5',  // Day after Thanksgiving, fourth Friday in November
    '12/23+5', // Christmas Eve
    '12/24',   // Christmas Eve
    '12/25+1',  // Christmas Eve
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1',  // Christmas Day
  ];

  // United Kingdom
  /*
  holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '5-1/1',   // Early May Bank Holiday, first Monday in May
    '5~1/1',   // Spring Bank Holiday, last Monday in May
    '8~1/1',   // Summer Bank Holiday, last Monday in August
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1',  // Christmas Day
    '12/25+5', // Boxing Day
    '12/26',   // Boxing Day
    '12/27+1',  // Boxing Day
  ];
  holidays[12] = gfStr;
  holidays[13] = emStr;
  */

  // France
  /*
  holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '5/1',   // Labor Day, May 1st
    '5/8',   // Victory in Europe Day (May 8th, 1945)
    '8/15',   // Assumption (August 15th)
    '11/1',   // All Saint's Day
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1',  // Christmas Day
  ];

  holidays[10] = emStr;
  holidays[11] = atStr;
  */

  // Germany
  /*
  holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '5/1',   // Labor Day, May 1st
    '8/15',   // Assumption (August 15th)
    '10/3',   // Day of German Unity
    '11/1',   // All Saint's Day
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1',  // Christmas Day
    '12/25+5', // Second Day of Christmas
    '12/26',   // Second Day of Christmas
    '12/27+1',  // Second Day of Christmas
  ];
  holidays[13] = gfStr;
  holidays[14] = emStr;
  holidays[15] = atStr;
  holidays[16] = wmStr;
  holidays[17] = ccStr;
  */

  // Netherlands
  /*
  holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '4/27',    // King’s Day
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1', // Christmas Day
    '12/25+5', // Boxing Day
    '12/26',   // Boxing Day
    '12/27+1', // Boxing Day
  ];
  holidays[10] = emStr;
  holidays[11] = atStr;
  holidays[12] = wmStr;
  */

  // Northern Ireland
  /*
  holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '3/19+1',  // St. Patrick’s Day on a saturday celebrated on next monday
    '3/17',    // St. Patrick’s Day
    '3/18+1',  // St. Patrick’s Day on a sunday celebrated on next monday
    '5-1/1',   // Early May Bank Holiday, first Monday in May
    '5~1/1',   // Spring Bank Holiday, last Monday in May
    '7/12',    // Battle of the Boyne
    '8~1/1',   // August Bank Holiday, last Monday in August
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1', // Christmas Day
    '12/25+5', // Boxing Day
    '12/26',   // Boxing Day
    '12/27+1', // Boxing Day
  ];
  holidays[16] = gfStr;
  holidays[17] = emStr;
  */
  // Australia
  /*
  holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '1/28+1',  // Australia Day on a saturday celebrated on next monday
    '1/26',    // Australia Day
    '1/27+1',  // Australia Day on a sunday celebrated on next monday
    '4/25',    // ANZAC Day
    '6-2/1',   // Queen’s Birthday (2nd Monday in June)
    '8-1/1',   // Bank Holiday (1st Monday in August)
    '10-1/1',  // Labour Day (1st Monday in October)
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1', // Christmas Day
    '12/25+5', // Boxing Day
    '12/26',   // Boxing Day
    '12/27+1', // Boxing Day
  ];
  holidays[16] = gfStr;
  holidays[17] = emStr;
  */
  var dayOfMonth = date.getDate(),
  month = date.getMonth() + 1,
  monthDay = month + '/' + dayOfMonth;
  if(holidays.indexOf(monthDay)>-1){
    return false;
  }
  var monthDayDay = monthDay + '+' + dayOfWeek;
  if(holidays.indexOf(monthDayDay)>-1){
    return false;
  }
  var weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1,
      monthWeekDay = month + '-' + weekOfMonth + '/' + dayOfWeek;
  if(holidays.indexOf(monthWeekDay)>-1){
    return false;
  }
  var lastDayOfMonth = new Date(date);
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
  lastDayOfMonth.setDate(0);
  var negWeekOfMonth = Math.floor((lastDayOfMonth.getDate() - dayOfMonth - 1) / 7) + 1,
      monthNegWeekDay = month + '~' + negWeekOfMonth + '/' + dayOfWeek;
  if(holidays.indexOf(monthNegWeekDay)>-1){
    return false;
  }
  return true;
}

function computus( y ) {
        var date, a, b, c, m, d;
        // Instantiate the date object.
        date = new Date();
        // Set the timestamp to midnight.
        date.setHours( 0, 0, 0, 0 );
        // Set the year.
        date.setFullYear( y );
        // Find the golden number.
        a = y % 19;
        // Choose which version of the algorithm to use based on the given year.
        b = ( 2200 <= y && y <= 2299 ) ?
            ( ( 11 * a ) + 4 ) % 30 :
            ( ( 11 * a ) + 5 ) % 30;
        // Determine whether or not to compensate for the previous step.
        c = ( ( b === 0 ) || ( b === 1 && a > 10 ) ) ?
            ( b + 1 ) :
            b;
        // Use c first to find the month: April or March.
        m = ( 1 <= c && c <= 19 ) ? 3 : 2;
        // Then use c to find the full moon after the northward equinox.
        d = ( 50 - c ) % 31;
        // Mark the date of that full moon—the "Paschal" full moon.
        date.setMonth( m, d );
        // Count forward the number of days until the following Sunday (Easter).
        date.setMonth( m, d + ( 7 - date.getDay() ) );
        // Gregorian Western Easter Sunday
        return date;
    }

var closeDate = businessDaysFromDate(5);
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// UnComment out your country - it is United States by default

// United States
// Comment this out if you are choosing another country

var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var suffixes = ["st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];
var closeDateNice = days[closeDate.getDay()]+' '+months[closeDate.getMonth()]+' '+closeDate.getDate()+suffixes[closeDate.getDate()-1];

// United Kingdom
//closeDate = closeDate.toLocaleDateString('en-GB', options);

// Northern Ireland
//closeDate = closeDate.toLocaleDateString('en-IE', options);

// France
//closeDate = closeDate.toLocaleDateString('fr-FR', options);

// Germany
//closeDate = closeDate.toLocaleDateString('de-DE', options);

// Netherlands
//closeDate = closeDate.toLocaleDateString('nl-NL', options);

// Australia
//closeDate = closeDate.toLocaleDateString('en-AU', options);

var closeSignature = "I will go ahead and mark this ticket as resolved. It will stay open until "+closeDate+", just in case you have any questions. It was great working with you. Have a wonderful day!\n\nThanks,\nJohn Smith\nTechnical Success Manager\no: 512.551.XXXX\n\nNote on Closed cases: replies to Closed cases do not alert the case owner.  If you have any follow up questions please open a new case and reference this case number ("+caseNumber+").";
var userSignature = "\nBest regards,\nJohn Smith | Technical Success Manager | 512.551.XXXX\n\n———\nIf you have a critical issue at any time of day or night - defined as a total outage of submission or display on production - please call our support hotline at 888-984-1381 (toll free) and someone will assist you.";
var sendToSoftserve = "Hello SoftServe,\n\nbenchname, PRR/C13, Cluster Prod/Staging, Display code (if applicable)\n\nExternal Communication no\n\nThanks!";
var newCSS = GM_getResourceText ("Customcss");

//this block runs on all salesforce case pages and all new comments page. Fixes word wrap issue, adds signature buttons and floats WorkIt!
GM_addStyle (newCSS);

if($('.pageType').html()) {
 if($('.pageType').html().substring(0,10) == 'Close Case') {
     $("#00N50000002D2N9").addClass("status_negative");
     $("#00N50000002AgSu").addClass("status_negative");
     alert("Before closing, make sure that you fill out the Nature of Issue and Solution Type fields with correct information as these may have changed during course of the case!");
 }
}
if(document.location.origin === 'https://bazaarvoice1--e2cp.na3.visual.force.com'){
    window.addEventListener("load", Greasemonkey_main1, false);
}
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
    var closeButton = document.createElement('input');
    closeButton.id = 'closeButton';
    closeButton.setAttribute('class','btn');
    closeButton.setAttribute('type','button');
    closeButton.setAttribute('name','closeButton');
    closeButton.setAttribute('value','Closing Signature');
    commentRow.insertBefore(signatureButton,null);
    commentRow.insertBefore(softserveButton,null);
    commentRow.insertBefore(closeButton,null);
    document.getElementById('softserveButton').onclick = function(){
        document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += sendToSoftserve;
        if (document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:publicPBSI:IsPublic_Checkbox").value == "on"){
            document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:publicPBSI:IsPublic_Checkbox").click();
        }
        document.getElementById("pg:addCommentF:addCommentPB:rptOrder:1:customFieldsPBS:j_id90:0:j_id91").value = "Awaiting TSE Assignment";
    };
    document.getElementById('signatureButton').onclick = function(){
        if(userSignature.indexOf('XXXX')>-1){
          alert("You haven't changed the default user signature yet!");
        }
        document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += userSignature;
    };
    document.getElementById('closeButton').onclick = function(){
        if(closeSignature.indexOf('XXXX')>-1){
          alert("You haven't changed the default close signature yet!");
        }
        document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea").value += closeSignature;
        document.getElementById("pg:addCommentF:addCommentPB:rptOrder:1:customFieldsPBS:j_id90:0:j_id91").value = "Resolved";
    };
}
//end block
// AddComment improved text
var commentDescriptionDiv = document.getElementById("pg:addCommentF:csPB:csPBS");
if(commentDescriptionDiv){
    var commentTextArea = document.getElementById("pg:addCommentF:addCommentPB:rptOrder:0:addCommentPBS:addCommentPBSI:Comment_TextArea");
    commentTextArea.style.width = window.innerWidth - 849 + "px";
    commentTextArea.style.minWidth = "425px";
    commentTextArea.style.height = "300px";
    commentDescriptionDiv.style.maxWidth = window.innerWidth - 316 + "px";
    commentDescriptionDiv.style.width = window.innerWidth - 316 + "px";
    commentDescriptionDiv.style.wordBreak = "break-all";
    commentDescriptionDiv.style.wordWrap = "break-word";
    commentDescriptionDiv.style.fontSize = "small";
    $(window).resize(function () {
        commentDescriptionDiv.style.maxWidth = window.innerWidth - 316 + "px";
        commentDescriptionDiv.style.width = window.innerWidth - 316 + "px";
        commentTextArea.style.width = window.innerWidth - 849 + "px";
    });
} else {
    console.log('Add Comment Description element not present');
}
//This block will run on all Support Case Types

if(document.getElementById('RecordType_ileinner')){
    console.log('Record Type Field is present');
    if(document.getElementById('RecordType_ileinner').innerHTML.substr(0,12) === "Support Team"||document.getElementById('RecordType_ileinner').innerHTML.substr(0,15) === "Product Support"){
        window.addEventListener("load", Greasemonkey_main, false);
    }
} else {
    console.log('Record Type Field is not present');
}
function Greasemonkey_main() {
    //load Open Sans font
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('link');
    script.rel = 'stylesheet';
    script.type= 'text/css';
    script.href= 'https://fonts.googleapis.com/css?family=Open+Sans:400,600';
    head.appendChild(script); //end font
    // Select Font size listener
    console.log('checking for font-size selector');
    if(document.getElementsByClassName('pageType')[0]) {
      if(document.getElementsByClassName('pageType')[0].innerHTML == 'Close Case') {
         alert("Make sure you correctly fill out Nature of Issue and Solution Type fields with correct information before closing!");
      }
    }
    document.body.addEventListener( 'change', function ( event ) {
        if( event.srcElement.id == 'selectFontSize' ) {
            var newSize = document.getElementById('selectFontSize').value;
            $('.beautified_comment').css('font-size',newSize);
        }
    } );
    //This function updates the important fields with color depending on their values
    function checkImportantFields(){
        var status = document.getElementById("cas7_ileinner");
        var natureOfIssueField = document.getElementById('00N50000002D2N9_ileinner');
        var rootCauseField = document.getElementById('00N50000002AgSu_ileinner');
        var relatedProductField = document.getElementById('00N50000002D2Rp_ileinner');
        var accountSupportGroupField = document.getElementById('00N50000003fP3z_ileinner');
        var primaryTSMConversationsField = document.getElementById('00N50000009s6XR_ileinner');
        var primaryTSMPRRField = document.getElementById('00N50000009s6XW_ileinner');
        var caseOriginField = document.getElementById('cas11_ileinner');
        var caseNotes = document.getElementById('00N50000002AHM3_ileinner');
        var supportNotes = document.getElementById('00N50000001yx07_ileinner');
        var testNegField = document.getElementById('fakeFake');
        //update nature of issue, root cause, and related product fields
        console.log('Checking fields . . .');
        // Nature of Issue
        if (natureOfIssueField){
            console.log('Nature of issue Field is present');
            if (natureOfIssueField.innerHTML === "&nbsp;") {
                $("#00N50000002D2N9_ileinner").addClass("status_negative");
            }else{
                //$("#00N50000002D2N9_ileinner").addClass("status_positive");
            }
        } else {
            console.log('Nature of issue Field not present');
        }
        // Root Cause
        if (rootCauseField){
            console.log('Root Cause Field is present');
            if (rootCauseField.innerHTML === "&nbsp;") {
                $('#00N50000002AgSu_ileinner').addClass("status_negative");
            } else {
                //$('#00N50000002AgSu_ileinner').addClass("status_positive");
            }
        } else {
            console.log('Root Cause Field not present');
        }
        // Case Origin
        if (caseOriginField){
            console.log('Case Origin Field is present');
            if (caseOriginField.innerHTML === "&nbsp;") {
                $("#cas11_ileinner").addClass("status_negative");
            } else {
                console.log('Case Origin is present');
            }
        } else {
            console.log('Case Origin Field not present');
        }
        // Primary TSM CV2
        if (primaryTSMConversationsField){
            console.log('Primary TSM CV2 Field is present');
            if (primaryTSMConversationsField.innerHTML === "") {
                console.log('No Primary Conversations TSM');
            } else {
                $('#00N50000009s6XR_ileinner').addClass("status_positive");
            }
        } else {
            console.log('Primary TSM CV2 Field not present');
        }
        // Primary TSM PRR
        if (primaryTSMPRRField){
            console.log('Primary TSM PRR Field is present');
            if (primaryTSMPRRField.innerHTML === "") {
                console.log('No Primary PRR TSM');
            } else {
                $('#00N50000009s6XW_ileinner').addClass("status_positive");
            }
        } else {
            console.log('Primary TSM PRR Field not present');
        }
        // Account Support Group
        if (accountSupportGroupField){
            console.log('Account Support Group Field is present');
            if (accountSupportGroupField.innerHTML === "") {
                accountSupportGroupField.innerHTML = "&nbsp";
                $("#00N50000003fP3z_ileinner").addClass("status_negative");
            } else {
                $("#00N50000003fP3z_ileinner").addClass("status_positive");
            }
        } else {
            console.log('Account Support Group Field not present');
        }
        // Status
        if (status){
            console.log('Status Field is present');
            if (status.innerHTML === "New" || status.innerHTML === "In Progress" || status.innerHTML === "Assigned") {
                $('#cas7_ileinner').addClass("status_negative");
            } else if(status.innerHTML.substr(0,7) === "Pending") {
                $('#cas7_ileinner').addClass("pending");
            } else {
                $('#cas7_ileinner').addClass("status_positive");
            }
        } else {
            console.log('Status Field not present');
        }
        // Case Notes
        if (caseNotes){
            console.log('Case Notes Field is present');
            if (caseNotes.innerHTML !== "&nbsp;"){
                $('#00N50000002AHM3_ileinner').addClass("status_important");
            }
        } else {
            console.log('Case Notes Field not present');
        }
        //update Support notes
        if (supportNotes){
            console.log('Support Notes Field is present');
            if (supportNotes.innerHTML !== ""){
                $('#00N50000001yx07_ileinner').addClass("status_important");
                var alertText = $('#00N50000001yx07_ileinner').text();
                alert(alertText);
            }
        } else {
            console.log('Support Notes Field not present');
        }
        //update last comment, contact name, description
        $("#cas3_ileinner").addClass("beautified_comment");
        $("#cas15_ileinner").addClass("beautified_comment");
        var maxWidth = window.innerWidth - 466;
        var maxWidthStr = maxWidth+"px";
        // Move Description to it's own table
        var descTD = document.getElementById("cas15_ilecell");
        var rowIndex = descTD.cellIndex;
        var descRow = descTD.parentElement;
        var labelTD = descRow.cells[rowIndex-1];
        var TDTR = descTD.parentElement;
        var TRTB = TDTR.parentElement;
        var TBTable = TRTB.parentElement;
        var TableDiv = TBTable.parentElement;
        // create a new table and append to original
        var tableDesc = document.createElement('table');
        tableDesc.classList.add('detailList');
        TableDiv.appendChild(tableDesc);
        var row = tableDesc.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.classList.add("addedFieldCol");
        $(".addedFieldCol").replaceWith(labelTD);
        cell2.classList.add("addedValueCol");
        $(".addedValueCol").replaceWith(descTD);
        TBTable.parentNode.insertBefore(tableDesc, TBTable.nextSibling);
        // Fix container breaking
        document.getElementById('ep').style.maxWidth = window.innerWidth - 416 + "px";
        document.getElementById('bodyCell').style.maxWidth = window.innerWidth - 416 + "px";
        document.getElementById('cas15_ileinner').style.maxWidth = window.innerWidth - 525 + "px";
        document.getElementById('cas15_ileinner').style.width = window.innerWidth - 525 + "px";
        document.getElementById('cas15_ileinner').style.minWidth = "465px";
        document.getElementById('cas15_ileinner').style.wordWrap = "break-word";
        $(window).resize(function () {
            document.getElementById('ep').style.maxWidth = window.innerWidth - 416 + "px";
            document.getElementById('bodyCell').style.maxWidth = window.innerWidth - 416 + "px";
            document.getElementById('cas15_ileinner').style.maxWidth = window.innerWidth - 525 + "px";
            document.getElementById('cas15_ileinner').style.width = window.innerWidth - 525 + "px";
            document.getElementById('cas15_ileinner').style.minWidth = "465px";
        });
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
                for(var w = 0; w < descanchors.length; w++){
                    if(descanchors[w].title.indexOf(adjusteddescimageName) != -1 && descanchors[w].target === "_blank" && descanchors[w].parentNode.parentNode.children[4].innerHTML === creationDate){
                        console.log('something fit this desc');
                        var descimageSrc = descanchors[w].href;
                        document.getElementById('cas15_ileinner').innerHTML = document.getElementById('cas15_ileinner').innerHTML.replace(descstr,"<div style='max-width:100%'><a target='_blank' href='"+descimageSrc+"'><img style='max-width:100%' src='"+descimageSrc+"'></a></div>");
                    }
                }
            }
        }
    }
    //updates case comments to be more readable
    function updateComments() {
        var viewImages = "javascript:RelatedList.get('" + document.location.pathname.substr(1) + "_RelatedAttachmentList').showXMore(100)";
        console.log('viewImages: ',viewImages);
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
                    }
                }
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
        var contactPhoneField = document.getElementById('cas9_ileinner');
        var clusterField = document.getElementById('00N50000001yzHK_ileinner');
        var CSDField = document.getElementById('00N50000001yTBP_ileinner');
        var TAMField = document.getElementById('00N50000002D3bq_ileinner');
        var clientName = document.getElementById('cas4_ileinner').childNodes[0].innerHTML;
        var caseTitle = document.getElementById('cas14_ileinner').innerHTML;
        var slaStatus = document.getElementById('00N50000002Cffz_ileinner').innerHTML;
        var bvTime = document.getElementById('00N50000002yQKN_ileinner').innerHTML;
        var contactName = document.getElementById('cas3_ileinner').children[0].innerHTML;
        // Contact Phone field
        if (contactPhoneField){
            console.log('Contact Phone Field is present');
            if (contactPhoneField.innerHTML !== "&nbsp;"){
                contactPhone = contactPhoneField.innerHTML;
            } else {
                contactPhone = "No Contact Number in SF";
            }
        } else {
            console.log('Contact Phone Field not present');
        }
        // Cluster field
        if (clusterField){
            console.log('Cluster Field is present');
            if(clusterField.innerHTML !== "&nbsp;"){
                cluster = clusterField.innerHTML.toUpperCase();
            } else {
                cluster = "No Cluster Info in SF";
            }
        } else {
            console.log('Cluster Field not present');
        }
        // CSD field
        if (CSDField){
            console.log('CSD Field is present');
            if(CSDField.innerHTML !== "&nbsp;"){
                csdName = CSDField.innerHTML;
            } else {
                csdName = "No CSD Info in SF";
            }
        } else {
            console.log('CSD Field not present');
        }
        // TAM field
        if (TAMField){
            console.log('Tam Field is present');
            if(TAMField.innerHTML !== ""){
                tamName = TAMField.innerHTML;
            } else {
                tamName = "No TAM Info in SF";
            }
        } else {
            console.log('TAM Field not present');
        }
        //check for milestone
        var iDateDiff, milestoneTTCR, TTCRStatus, milestoneTTFR, TTFRStatus, milestoneTTSR, TTSRStatus, TTCRInfo, TTFRInfo, TTSRInfo, milestoneBodyID;
        var timeTitle = [];
        var timeRemain = [];
        var timeStatus = [];
        var milestoneArray = [];
        var milestoneListID = document.getElementsByClassName('listHoverLinks')[0].children[0].id;
        milestoneBodyID = milestoneListID.substr(0,milestoneListID.length-4);
        milestoneBodyID += "body";
        if(document.getElementById(milestoneBodyID).children[0].children[0].children[0].children[0].innerHTML !== "No records to display"){
            var children = document.getElementById(milestoneBodyID).children[0].children[0].children;
            for (var i = 0,len=children.length; i < len; i++) {
                milestoneArray[i] = children[i];
                // Do stuff
                console.log('Milestone: ',milestoneArray[i].children[1].innerText,' Time Remaining: ',milestoneArray[i].children[3].innerHTML);
                timeTitle[i] = milestoneArray[i].children[1].innerText;
                timeRemain[i] = milestoneArray[i].children[3].innerHTML;
                console.log("6th column(violation): ",$(milestoneArray[i].children[5].children[0]).attr('title'));
                console.log("7th column(completed): ",$(milestoneArray[i].children[6].children[0]).attr('title'));
                if(timeRemain[i] !== undefined){
                    if(timeRemain[i] === "00:00" && $(milestoneArray[i].children[5].children[0]).attr('title') !== ""){
                        timeStatus[i] = "OUT";
                    } else if(timeRemain[i] === "00:00" && $(milestoneArray[i].children[5].children[0]).attr('title') === ""){
                        timeStatus[i] = "COMPLETED";
                    } else if(timeRemain[i].substr(0,timeRemain[i].length -3) < 17){
                        timeStatus[i] = "ALMOST";
                    } else {
                        timeStatus[i] = "IN";
                    }
                }
            }
        }
        //add data to infobar
        $('#infoBar').append("<div class='infoBarCenter'>"+clientName+"<br>"+cluster+" - "+caseTitle+"</div>");
        var timeInfo = "<div class='infoBarLeft'>";
        for (var j = 1, leng = timeTitle.length;j<leng;j++){
            timeInfo+="<span>"+timeTitle[j]+": "+timeRemain[j]+"  Status: </span><span class='"+timeStatus[j]+"'>"+timeStatus[j]+"</span></br>";
        }
        timeInfo+="</div>";
        $('#infoBar').append(timeInfo);
        $('#infoBar').append("<div class='infoBarRight'><select id='selectFontSize' style='margin-right: 25px;'><option value='large'>Large</option><option value='medium'>Medium</option><option value='small'>Small</option><option value='x-small'>X-Small</option><option value='xx-small'>XX-Small</option><option value='15px' selected>15px</option><option value='14px'>14px</option></select>"+"Contact Name: "+contactName+"<br><img width='16' height='10' src='/img/btn_nodial_inline.gif'> "+contactPhone+"<br>CSD: "+csdName+" - TAM: "+tamName+"</div>");
        $(".ALMOST").css("color","#CD5C5C");
        $(".COMPLETED").css("color","#00FF00");
        $(".OUT").css("color","#CD5C5C");
        $(".OUT").css("font-weight","900");
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