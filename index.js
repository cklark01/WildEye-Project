const express = require('express');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'WildEye',
    database: 'DevicesDB'
});

connection.connect(err => {
    if(err) {
      throw err                                                                                                                                                                                                                                                                                                                                                                                           
    }
    console.log('MySQL Connected');
});



const app = express();


app.use(express.json());
const {check , validationResult } = require('express-validator');




app.post('/registerIP', function(req, res) {
    let stmt = 'INSERT INTO devices_table(name,ip,StartedDateTime) VALUES(?,?,?)';
    
    console.log(req.body);
    let deviceData = [req.body.name,req.body.ip,req.body.StartedTime];
    
    connection.query(stmt, deviceData, (err, results, fields) => {
        if (err) {
            return console.error(err);
        }

        console.log('Device IP registered');

    })
})

app.post('/sendData', function(req, res) {
    let stmt = 'INSERT INTO SensorData(Date, Time, Temp, Hum, Ax, Ay, Az, Lat, Lon, Batt, SdCapacity) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    console.log(req.body);
    
    console.log(req.body.date)
    let deviceData = [req.body.date,req.body.time,req.body.temp,req.body.hum,req.body.ax,req.body.ay,req.body.az,req.body.lat,req.body.lon,req.body.Batt,req.body.SdCapacity];

    connection.query(stmt, deviceData, (err, results, fields) => {
        if (err) {
            return console.error(err);
        }

        console.log('Sensors Data stored');

    })
})

app.post('/validateIP', [
    check('IP').isIP()
],(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()})
    }
    const IP = req.body.ip;
})




app.listen('8080', () => {
    console.log('Serve started on port 8080')
  })