var port = 8080;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var indexRouter = require("./routes/index");
var http = require('http').Server(app);

http.listen(port);


app.use(cors());

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    next();
});

app.use("/", indexRouter);


console.log('Magic happens on port ' + port);

exports = module.exports = app;