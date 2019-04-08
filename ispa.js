const express = require('express');

//for handling get and post requests
const app = express();
const bodyParser = require('body-parser');

//user starId
var userId = 'undefined so far';

//for connecting database
const mysql = require('mysql');

//for bcrypting password
const bcrypt = require('bcrypt');

//setting view engine for sending parameters
app.set('view engine', 'ejs');

//setting default saltrounds for decrypting password
const saltRounds = 10;

//credentials for connecting database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9845466041',
    port: 3306,
    database: '380Project'
});


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//loading html file
app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/punisher$.html');
});

//loading css file
app.get('/css/style.css', function(req, res)
{
    res.sendFile(__dirname + '/css/style.css');
});

//loading css file
app.get('/css/style1.css', function(req, res)
{
    res.sendFile(__dirname + '/css/style1.css');
});


//loading list file
app.get('/list', function(req, res)
{
    var list = [];
    connection.query('SELECT * FROM student WHERE starId = ?', [userId], (err, rows, fields) =>
    {
        if(err)
        {
            console.log(err);
        }
        else{
            connection.query('SELECT * FROM scholarships WHERE scholarshipGPA < ? AND scholarshipCountry != ? AND scholarshipMajor = ?',
            [rows[0].gpa, 'US', rows[0].major], (err, sRows, sFields) =>
            {
                if (err)
                {
                    console.log(err);
                }
                else{
                    
                    for (i=0; i < sRows.length; i++)
                    {
                        list.push({name: sRows[i].scholarshipsName, description: sRows[i].scholarshipDescription, link: sRows[i].link});
                        console.log(list[0].name);
                    }
                    res.render('list.ejs', {
                        list:list
                    });
                }
            });
        }
    });    
});
app.get('/login', function(req, res)
{
    userId = req.query.starId;
    connection.query('SELECT * FROM student WHERE starId = ?', [req.query.starId], (err, rows, fields) =>
    {
        if(err)
        {
            console.log(err);
        }
        else{
            var result;
            var hashed;

            bcrypt.compare(req.query.pass, rows[0].password, function(err, match)
            {
                if (err) throw err;
                else
                {
                    if(match)
                    {
                        res.redirect('/list/');

                    }
                    else
                    {
                        res.redirect('/home/');
                    }
                }
            });
        }
    });
});
app.listen(9000, function()
{

});

//response.redirect