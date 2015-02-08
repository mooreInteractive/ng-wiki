// app/models/page.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var Page = mongoose.Schema({
    name : {type : String, default: '', required: true},
    title : {type : String, default: '', required: true, unique:true},
    author : {type: mongoose.Schema.ObjectId.name, ref: 'User'},
    category : {type: mongoose.Schema.ObjectId.name, ref: 'Category'},
    body : {type : String, default: '', required: true},
    created_date: {type: Date, required: true, default: Date},
    last_modified: {type: Date, required: true, default: Date}
});

module.exports = mongoose.model('Page', Page);