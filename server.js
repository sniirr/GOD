var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var path = require('path');
app.use(express.json());
// app.use(express.static(path.join(__dirname, "client","build")));
app.use(express.static('client/build'));
console.log(path.join(__dirname, "client", "build"));
app.listen(port, function () { console.log('Server listen on port', port); });
