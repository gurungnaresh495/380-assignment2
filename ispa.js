const express = require('express');

//for handling get and post requests
const app = express();
const bodyParser = require('body-parser');



app.use(require('./routes'));

app.use(require('./routes/database1.js'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.listen(9000, function()
{

});

//response.redirect