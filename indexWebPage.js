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
app.use(express.static('public'));


app.get('/getTemp', (request, response) => {
    let sql = 'SELECT * FROM SensorData'
    let query = connection.query(sql, (err, results) => {
      if(err){
        throw err
      }
      response.json(results[Object.keys(results).length-1].Temp);
    });
       
  });

app.get('/getBatt', (request, response) => {
    let sql = 'SELECT * FROM SensorData'
    let query = connection.query(sql, (err, results) => {
      if(err){
        throw err
      }
      response.json(results[Object.keys(results).length-1].Batt);
    });
       
  });

app.get('/getSdCard', (request, response) => {
    let sql = 'SELECT * FROM SensorData'
    let query = connection.query(sql, (err, results) => {
      if(err){
        throw err
      }
      response.json(results[Object.keys(results).length-1].SdCapacity);
    });
       
  });

app.get('/getStarted', (request, response) => {
    let sql = 'SELECT * FROM devices_table'
    let query = connection.query(sql, (err, results) => {
      if(err){
        throw err
      }
      response.json(results[Object.keys(results).length-1].StartedDateTime);
    });
       
  });
app.listen('3000', () => {
    console.log('Serve started on port 3000')
  })