<?php
$PID = getmypid();
print "<div id='pidDiv' style='display:none;'>" . $PID . "</div>";
$useLink = true;
$first = true;
$pdflinks = array();
if($_POST['subreddit'] === "Front Page"){
        $html = file_get_contents('http://www.reddit.com');
        $subreddit = 'http://www.reddit.com';
} else {
        $html = file_get_contents('http://reddit.com/r/' . $_POST['subreddit']);
        $subreddit = 'http://reddit.com/r/' . $_POST['subreddit'];
}
$dom = new DOMDocument;
$dom->loadHTML($html);
$links = $dom->getElementsByTagName('a');
foreach ($links as $link) {
        if( (substr($link->getAttribute('href'),0,21) != "http://www.reddit.com")  && (substr($link->getAttribute('href'),0,7) === "http://") && ($first != true) && (sizeof($pdflinks) < intval($_POST['articlenum'])) && ($link->getAttribute('href') != "http://en.wikipedia.org/wiki/Pacific_Time_Zone") && $useLink === true){
                if(substr($link->getAttribute('href'),-3) === "png" || substr($link->getAttribute('href'),-3) === "gif" || substr($link->getAttribute('href'),-3) === "jpg"){
                        array_push($pdflinks, substr($link->getAttribute('href'),0,-4));
                } else {
                        array_push($pdflinks, $link->getAttribute('href'));             
                }
        }
        $first = false;
        $useLink = !$useLink; 
}         
$pdflinks = implode(" ",$pdflinks);
$PGM = 'ptkwkhtmltopdf ' . $subreddit . ' ' . $pdflinks . ' pdfs/reddit'. $PID . '.pdf';
echo `$PGM`
#print_r($pdflinks);

#print $pdflinks;
?>
