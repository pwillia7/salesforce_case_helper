#Salesforce Case Helper for BV
This userscript adds various improvements to the Salesforce case view for Bazaarvoice Support

######TO INSTALL PLEASE READ THE INSTALL INSTRUCTIONS BELOW!

###Recently Added:
* Inline comment & description images!
* Signature and SoftServe button added to new case comment page
* Script runs only on Support Team Case types
* Script runs on new comment pages for comment container fix

###Improvements include:

* Information bar displays on top of screen
* Floating WorkIt! Time Tracking
* New Business Days Open added to the Info Bar -- works globally
* Fixed broken comments container issue for long links
* Improved readability and highlighting of important fields
* JIRA button
* Updated title for more information while not in tab
  
###To install:
######ATTENTION - Before you install disable the previous salesforce helper  greasemonkey/tampermonkey script from your browser and restart the browser. 

[Download](https://github.com/pwillia7/salesforce_case_helper/archive/master.zip) the script- Clone this repo using git or download the repo using [this link](https://github.com/pwillia7/salesforce_case_helper/archive/master.zip)

Unzip the archive to a folder on your computer.

You'll also need to have [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) installed to Chrome and [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) installed to Firefox.


2. Open salesforce_case_helper.tamper.js and salesforce_case_helper.user.js in a text editor of your choice and modify the userSignature and sendToSoftserve variables to match your signature. These are located near the top of the file and are the first variables defined. 

3. Make sure you have Greasemonkey (Firefox) or Tampermonkey (Chrome) installed to your browser of choice.

4. If using Chrome, drag *salesforce_case_helper.tamper.js* from the file browser into Chrome. Tampermonkey will not always accept scripts, so you may need to copy and paste the script in manually. This can be done by clicking on the Tampermonkey icon, clicking "Add a new Script" and pasting in the salesforce_case_helper.tamper.js file. 

   If you have issues installing - Go to Chrome's extensions page, enable the "Allow access to file URLs" checkbox at the Tampermonkey item. 

   If using Firefox, simply drag *salesforce_case_helper.user.js* from the file browser into Firefox.

If you're still having trouble installing, please make sure you've uninstalled any previous salesforce helper scripts and try again.

![alt tag](https://raw.github.com/pwillia7/salesforce_case_helper/master/screenshot.png)

