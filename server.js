var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var path = require('path');
app.use(express.json());
// app.use(express.static(path.join(__dirname, "client","build")));
// app.use(express.static('client/build'));
// app.use('/static', express.static(path.join(__dirname, 'client','build')));
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, "client", "build", 'aaa'));
app.listen(port, function () { console.log('Server listen on port', port); });
