var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.options('*', cors());

var dummy = require('./dummy');

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/xcp', function (req, res) {
    console.log("I am from xcp");
    res.send('hello world');
});

app.get('/dummy', function(req, res){
    res.json(dummy);
})

app.listen(3001, function () {
  console.log('app listening on port 3001!')
})
