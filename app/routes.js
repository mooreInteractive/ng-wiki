// app/routes.js
var mongoose = require('mongoose');

var Category = require('./models/category');
var Page = require('./models/page');
var User = require('./models/user');

var db = require('../config/db');

mongoose.connect(db.url);

module.exports = function(app) {

    // API Routes  
    //Categories
    app.get('/api/categories', getCategories );
    app.post('/api/categories', addCategory );
    // route to handle delete goes here (app.delete)   
    
    // ---- All other none API routes use front-end routing ----
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
    
function getCategories(req, res){
    Category.find(function(err, categories) {
        if(err){ res.send(err); }
        res.json(categories);
    });
}

function addCategory(req, res) {
    var cat = new Category(req.body);
    cat.save(function(err, cat){
        if(err){ res.send(err); }
        res.json(cat);
    });
}