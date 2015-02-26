// app/models/page.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var Page = mongoose.Schema({
    name : {type : String, default: '', required: true},
    title : {type : String, default: '', required: true, unique:true},
    author : {type : String, default: '', required: true},
    category : {type: mongoose.Schema.ObjectId.name, ref: 'Category'},
    body : [{ text: String, date: Date, sectionTitle: String }],
    created_date: {type: Date, required: true},
    last_modified: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Page', Page);