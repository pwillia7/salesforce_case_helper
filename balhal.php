<html>
<head>
</head>
<body>                     
        <?php
$PID = getmypid();
print "<div id='pidDiv' style='display:none;'>" . $PID . "</div>";
$pdflinks = array();
if($_POST['subreddit'] === "Front Page"){
        $html = file_get_contents('http://www.reddit.com/.json');
        $subreddit = 'http://www.reddit.com';
} else {
        $html = file_get_contents('http://reddit.com/r/' . $_POST['subreddit']);
        $subreddit = 'http://reddit.com/r/' . $_POST['subreddit'] . "/.json";
}
$html = json_decode($string,true);

foreach ($html as $links => $link) {
print($links);
}
?>
</body>
</html>
~            