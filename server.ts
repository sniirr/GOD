const express = require('express');
const app = express();
const port:number|string = process.env.PORT || 4000;
const path = require('path');

app.use(express.static(path.join(__dirname, "client","build")));
app.use(express.json());

import {secret} from './secret';


console.log(secret);


app.listen(port, () => { console.log('Server listen on port', port) });