var express = require('express');
var path = require('path');
var http = require('http');
var morgan = require('morgan');
var router = require('router');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('config');
var log = require('libs/log')(module);
var mongoose = require('libs/mongoose');
var Product = require('model/product').Product;


var app = express();


app.set("port", config.get('port'));
app.set('views', path.join(__dirname, '/template'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(cookieParser);
//app.use(router);


http.createServer(app).listen(config.get('port'), function () {
    log.info('express server is running on' + config.get('port'));
});


app.get('/new', function (req, res, next) {


    res.render("new",{});
});

app.post('/new', function(req, res, err){
    var product = new Product();
    product.name = req.body.name;
    product.size = req.body.size;
    product.quantity = req.body.quantity;
    product.save(function (err) {
        if (err) {
            res.send(err);
        }
    res.redirect('/get')
    });
});

app.get('/edit/:_id', function() {
    var res = new Product().find({ _id:req.body._id});
    res.render('new', res);
});

app.param(['_id'], function(req, res, next, value){
    req.body._id = value;
    next();
});


app.get('/get', function (req, res, next) {
    return Product.find(function (err, products) {
        if (err)
            res.send(err);
        var result = {};
        console.log(products);
        //Product.find({}, function(err, products) {
        //    log.info(products);
        res.render("index", {
            body: '<p> Some text</p>',
            list: products
        })
    });

});

app.use(function (req, res, next) {
    if (req.url == '/') {
        res.end('Hello')
    } else {
        next(new Error('whoops'));
    }
});

app.use(function (err, req, res, next) {
    var errorHandler = require('express-error-handler');
    errorHandler(err, req, res, next);
    res.sendStatus(500)
    //app.use(fn);
});


// view engine setup


//// uncomment after placing your favicon in /public

//
//app.use('/', routes);
//app.use('/users', users);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});
//
//
//module.exports = app;
