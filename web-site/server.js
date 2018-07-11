const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5

const app = express();
const xhr = new XMLHttpRequest();
const upload = multer(); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*',function(req,res,next) {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','http://localhost:4200');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.sendStatus(200);
    res.sendFile(__dirname  + '/public/index.html');

    next();
});

// app.get('/', function (req, res) {
//    res.sendFile(__dirname  + '/public/index.html');
// });


app.post('/byarticul', upload.array(), function (req, res) {

    console.log(req.body.article);
    const article = req.body.article;

    const url = 'http://178.124.159.37:5454/api/v1/price/getitems?format=json&art=' + article;

    xhr.open('POST', url, false);
    xhr.setRequestHeader('Authorization', 'Bearer R4RvQG61KheGVuGPJCOrwgtt');
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText);
    } else {
        console.log( xhr.responseText );
        res.send(xhr.responseText);
    }
});

app.post('/bybrand', upload.array(), function (req, res) {

    console.log(req.body.article);
    const article = req.body.article;
    const brand = req.body.brand;

    const url = 'http://178.124.159.37:5454/api/v1/price/getitems?format=json&art=' + article + '&brand=' + brand;

    xhr.open('POST', url, false);
    xhr.setRequestHeader('Authorization', 'Bearer R4RvQG61KheGVuGPJCOrwgtt');
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText);
    } else {
        console.log( xhr.responseText );
        res.send(xhr.responseText);
    }

});

app.get('/brands', function (req, res) {

    const url = 'http://178.124.159.37:5454/api/v1/price/getlistofbrands?format=json';

    xhr.open('POST', url, false);
    xhr.setRequestHeader('Authorization', 'Bearer R4RvQG61KheGVuGPJCOrwgtt');
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText);
    } else {
        console.log( xhr.responseText );
        res.send(xhr);
    }

});

//Forward
app.get('/forward', function (req, res) {

    const url = 'http://api.forward-motors.com/auth/token';
    const body = "username=nkmotors&password=4d9dbad784fb6f69";


    xhr.open('POST', url, false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText);
    } else {

        console.log( xhr.responseText );


        res.send(xhr.responseText);
    }


});

app.get('/forward2', function (req, res) {
    const url2 = 'http://api.forward-motors.com/search/index';
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MzAzODE0OTYsImp0aSI6IlcxcXJRVWtsd3lcL1A5MkZtMFc1WmtaeVwvMVJLWTJXTXpDUGRJUmZJV01RVT0iLCJpc3MiOiJhcGkuZm9yd2FyZC1tb3RvcnMuY29tIiwibmJmIjoxNTMwMzgxNDk1LCJleHAiOjE1MzA0Njc0OTUsImRhdGEiOnsidXNlcklkIjoiOTcyNiIsInVzZXJOYW1lIjoibmttb3RvcnMifX0.nu9zGbK27GbwGbF6__JbQLF8MTHWl-ZGzEY2Jq9kOo1ULYtqm0gTSxrmyS23Is-YbP210Ufp2niSwwdK4DIGpg';
    xhr.open('POST', url2, false);
    xhr.setRequestHeader('Content-Type', 'Content-type: application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send(JSON.stringify({"phrase":"OC47"}));

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText);
    } else {
        console.log( xhr.responseText );
        res.send(xhr.responseText);

    }
});

app.listen(3030);
console.log('server start 3030 port');