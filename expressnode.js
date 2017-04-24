var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
server.listen(3000, function() {
    console.log("Node listen on port 3000");
});
app.use(express.static(__dirname));
app.use(express.static('node_modules'));
//若html名為index.html的話則不需這個, 這邊為基礎路由功能
//app.get('/',function(request, response){
//    response.send('Hello World!');
//});
