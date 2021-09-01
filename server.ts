const express = require('express');
const app = express();
const port:number|string = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(express.json());

import {secret} from './secret';


console.log(secret);


app.listen(port, () => { console.log('Server listen on port', port) });