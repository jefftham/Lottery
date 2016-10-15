/**
 * @function        
 * @description     router.js uses node express module to handle http request.
 * @module          router.js
 * @access          public
 * @returns {object}  app - an instance of express.js and added all the relavant functionalities
 *                          1) invalid paths are given 404 page and let 404.html to redirect to the main page.
 * @example          var express = require('./Packages/router.js');
 *                   var app = express();
 * @author          Jeff Tham <Jeff.Tham@email.com>
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


module.exports = function() {

    var app = express();

      app.use(logger('dev'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      //app.use(cookieParser());
      //app.use(express.static(path.join(__dirname, 'public')));

/*    
    // view engine setup
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'hbs');
*/


    var publicFolder= __dirname + '/../www/';    //up one level

    //makes the files in the publicFolder are visible to public. (js, img, css files should be placed inside of publicFolder)
    app.use(express.static(publicFolder));


    //whatever files that are not in publicFolder will treat as 404  - page not found
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;

      //shows 404.html to browser and let 404.html redirect user to the main page.
      //res.redirect('/404.html');
      next(err);
    });
     

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });


    return app;

};
