// app/routes.js

var Category = require('./models/category');
var Page = require('./models/page');
var User = require('./models/user');

    module.exports = function(app) {

        // server routes ===========================================================

        // sample api route
        app.get('/api/categories', function(req, res, next) {
            // use mongoose to get all nerds in the database
            Category.find(function(err, cats) {
                if(err){ return next(err); }

                res.json(cats); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/api/categories', function(req, res, next) {

            var cat = new Category(req.body);

              cat.save(function(err, cat){
                if(err){ return next(err); }

                res.json(cat);
            });

        });
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };