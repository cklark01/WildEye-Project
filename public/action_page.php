<?php
header('Access-Control-Allow-Origin: *');
?>

<html>
<body>

Thermometer will record every <?php echo $_GET["tempRecord"]; ?><br>
GPS will record every : <?php echo $_GET["GPSRecord"]; ?><br>
Camera will record every: <?php echo $_GET["CameraRecord"]; ?>

</body>
</html>

