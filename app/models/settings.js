// app/models/category.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var Settings = mongoose.Schema({
    name : {type : String, default: '', required: true},
    tagline : {type : String, default: ''},
    welcome : {type : String, default: ''},
    motd : {type : String, default: ''},
    homeHTML : {type : String, default: ''}
});

module.exports = mongoose.model('Settings', Settings);

//used to isnert a new record for settings into the db. The application will not create this for you. ((Maybe it should))
//db.settings.insert({ name: 'ng-Wiki', tagline: 'Wiki software built with AngularJS', welcome: 'Hello. Welcome to the ng-Wiki.', motd: 'Angular is a new and fun JS framework for buildign single page applications, like this wiki.', homeHTML: '' });