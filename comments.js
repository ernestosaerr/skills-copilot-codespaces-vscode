//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

//Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Load comments from file
var comments = JSON.parse(fs.readFileSync('./comments.json', 'utf8'));

//Get comments
app.get('/comments', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

//Add comment
app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
  });
});

//Start web server
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
