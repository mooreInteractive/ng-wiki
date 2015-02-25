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
    app.delete('/api/categories/:cat_id', deleteCategory );    
    
    //Pages
    app.get('/api/:cat_id/pages', getPagesByCategory );
    app.get('/api/pages/:page_id', getPage );
    app.put('/api/pages/:page_id', updatePage );
    app.post('/api/pages', addPage );
    app.delete('/api/pages/:page_id', deletePage );
    
    //Dev Utilities
    app.delete('/api/cleardb', clearMongoDb );
    
    // ---- All other none API routes use front-end routing ----
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};

//Categories API Functions 
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

function deleteCategory(req, res){
    Category.remove({
        _id: req.params.cat_id
    }, function(err, categories) {
        if(err){ res.send(err); }
        res.json(categories);
    });
}

//Pages API Functions
function getPagesByCategory(req, res){ 
    Page.find({
        category: req.params.cat_id
    }, function(err, pages) {
        if(err){ res.send(err); }
        res.json(pages);
    });
}
function getPage(req, res){ console.log('getPage'); }
function updatePage(req, res){ console.log('updatePage'); }
function addPage(req, res){ console.log('addPage'); }
function deletePage(req, res){ console.log('deletePage'); }

//Dev Utilities API Functions
function clearMongoDb(req, res){
    Category.remove({}, function(err, categories) {
        if(err){ res.send(err); }
        res.json(categories);
    });
}