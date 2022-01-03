var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

var app = express();

app.use(bodyParser.json());

app.use(cors())

app.options('*', cors())



app.get('/api/test', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.get('/api/report/', function (req, res, next) {
    let rawdata = fs.readFileSync('reportData.json');
    let time = JSON.parse(rawdata);

    res.json(time);
})

app.post('/api/report', function (req, res, next) {

    // Read from file
    let rawdata = fs.readFileSync('reportData.json');
    let time = JSON.parse(rawdata);

    // Add new data 
    time.push(req.body);

    // Save data to file
    let json = JSON.stringify(time);
    fs.writeFileSync(path.join(__dirname, "./", "reportData.json"), json)

    res.json({ success: "Updated Successfully", status: 200 });
})

app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 8080')
})