var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/demodb');

// run this at the very beginning
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS project (name TEXT UNIQUE, tasks TEXT)");

    var dummy = "[{\"phase\":{\"name\":\"New\"},\"cards\":[]},{\"phase\":{\"name\":\"In Progress\"},\"cards\":[]},{\"phase\":{\"name\":\"Resolve\"},\"cards\":[]},{\"phase\":{\"name\":\"Pending\"},\"cards\":[]}]";

    db.run("INSERT OR REPLACE INTO project (name, tasks) VALUES (?, ?)", "dummy", dummy);
});

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var dummy = require('./dummy');

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/dummy', function(req, res){
    res.json(dummy);
})

app.get('/project/:name', function(req, res){
    db.get("SELECT tasks FROM project WHERE name = '"+ req.params.name +"'", function(err, result){
        res.json(JSON.parse(result.tasks));
    });
});

app.post('/project/:name', function(req, res){
    var tasks = req.body;
    db.run("INSERT OR REPLACE INTO project (name, tasks) VALUES (?, ?)", req.params.name, JSON.stringify(tasks), 
    function(err, result){
        res.end();
    })
})

app.listen(3001, function () {
  console.log('app listening on port 3001!')
})
