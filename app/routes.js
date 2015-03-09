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
    app.get('/api/page/:page_name', getPage );
    app.put('/api/page/:page_id', updatePage );
    app.post('/api/pages', addPage );
    app.delete('/api/page/:page_id', deletePage );
    
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
    },
    'name title category',
    function(err, pages) {
        if(err){ res.send(err); }
        res.json(pages);
    });
}

function getPage(req, res){ 
    Page.findOne({
        name: req.params.page_name
    }, function(err, pages) {
        if(err){ res.send(err); }
        res.json(pages);
    });
}

function updatePage(req, res){ 
    Page.findOne({
        _id: req.params.page_id
    },
    function(err, page) {
        if(err){ res.send(err); }
        page.body = req.body.body;
        page.title = req.body.title;
        page.intro = req.body.intro;
        page.name = req.body.name;
        page.last_modified = Date.now();
        
        page.save(function(err, page){
            if(err){ res.send(err); }
            res.json(page);
        });
    });
}

function addPage(req, res){ 
    var page = new Page(req.body);
    page.save(function(err, page){
        if(err){ res.send(err); }
        res.json(page);
    });
}

function deletePage(req, res){ 
    Page.remove({
        _id: req.params.page_id
    }, function(err, page) {
        if(err){ res.send(err); }
        res.json(page);
    });
}

//Dev Utilities API Functions
function clearMongoDb(req, res){
    Category.remove({}, function(err, categories) {
        if(err){ res.send(err); }
        
    Page.remove({}, function(err, pages) {
        if(err){ res.send(err); }
        res.json({message: 'everything\'s deleted'});
    });
    });
}