const express = require('express');
const router = express.Router();
const path = require('path');

//loading html file
router.get('/', function(req, res)
{
    res.sendFile(path.resolve('punisher$.html'));
});

//loading css file
router.get('/css/style.css', function(req, res)
{
    res.sendFile(path.resolve('css/style.css'));
});

//loading css file
router.get('/css/style1.css', function(req, res)
{
    res.sendFile(path.resolve('css/style1.css'));
});

module.exports = router;