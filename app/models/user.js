// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var User = mongoose.Schema({
    name : {type : String, default: ''},
    email : {type : String, default: ''},
    passport : {type : String, default: ''},
    role : {type : String, default: 'viewer'},
    created_at: {type: Date, required: true, default: Date}
});

module.exports = mongoose.model('User', User);