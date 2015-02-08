// app/models/category.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var Category = mongoose.Schema({
    name : {type : String, default: '', required: true},
    url : {type : String, default: '', required: true}
});

module.exports = mongoose.model('Category', Category);