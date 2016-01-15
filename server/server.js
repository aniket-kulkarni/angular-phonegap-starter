var express = require('express');
var http = require('http');
var path = require('path');

var app =express();

var server = http.createServer(app);
var environment = process.env.NODE_ENV;

switch (environment) {
    case 'dist':
        console.log('** DIST **');
        app.use(express.static(path.join(__dirname, '../dist/web')));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static(path.join(__dirname, '../client')));
        break;
}

var port = Number(process.env.PORT || 3659);

server.listen(port,function() {
  console.log("server running at PORT:"+port);
});
