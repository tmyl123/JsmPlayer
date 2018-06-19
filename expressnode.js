var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
server.listen(3000, function() {
    console.log("Node listen on port 3000");
});
app.use(express.static(__dirname));
app.use(express.static('node_modules'));

app.get('/dev', function(req, res) {
  res.sendFile(__dirname + '/index_dev.html');
 // res.sendFile('index.html', { root: __dirname });
});
