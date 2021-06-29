<?php



header('Access-Control-Allow-Origin: *');

$servername = "127.0.0.1";
$username = "root";
$password = "WildEye";
$dbname = "DevicesDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT ID, Temp, Hum FROM SensorData";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table><tr><th>ID</th><th>Name</th></tr>";
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "<tr><td>".$row["ID"]."</td><td>".$row["Temp"]." ".$row["Hum"]."</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 results";
}
$conn->close();
?>