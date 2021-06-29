const mysql = require("mysql");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("export.csv");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "WildEye",
  database: "DevicesDB"
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  
  var qry = "SELECT * FROM SensorData WHERE date_column BETWEEN" + '2014-01-10' +"AND" +'2015-01-01' + ";"
  // query data from MySQL
  connection.query(qry, function(error, data, fields) {
    if (error) throw error;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);

    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function() {
        console.log("export.csv successfully!");
      })
      .pipe(ws);
  });
});

function PopUP() {
    console.log("Hello World!");
    Alert("Stop");
}