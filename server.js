//https服务器
var express = require("express");
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('private.pem', 'utf8');
var certificate = fs.readFileSync('file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use(express.static("web"));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 8080;
var SSLPORT = 8081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
app.get('/', function(req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }
})

// //http服务器
// let express = require("express");
// let app = express();
 
// app.use(express.static("web"));
 
// app.listen(8080, ()=>{
//     console.log("服务启动成功。");
//     console.log('http://127.0.0.1:8080/');
//     console.log('http://localhost:8080/')
// })
