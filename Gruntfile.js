var mongoose = require('mongoose');

var Settings = require('./app/models/settings');
var Category = require('./app/models/category');
var Page = require('./app/models/page');
var User = require('./app/models/user');

var db = require('./config/db');

mongooseConn = mongoose.connection;

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'app/models/*.js', 'app/routes.js', 'public/app/**/*.js', 'public/app/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
  
  grunt.registerTask('cleandb', 'Delete all Mongo DB Data', function(){
        var done = this.async();
        mongoose.connect(db.url);
        mongooseConn.on('open', function(){
            console.log('-Connected to DB');
            Category.remove({}, function(err, categories) {
                if(err){ res.send(err); }
                console.log('-Categories Deleted');                  
                Page.remove({}, function(err, pages) {
                    if(err){ res.send(err); }
                    console.log('-Pages Deleted');
                    mongooseConn.close(done);
                });                
            });
        });        
  });
  
  grunt.registerTask('addDefaultData', 'Add Default data to Mongo DB for WIki Settings', function(){
        console.log('adding default data...(not yet)');
        var done = this.async();
        mongoose.connect(db.url);
        mongooseConn.on('open', function(){
            console.log('-Connected to DB');
            Settings.findOne({},function(err, settings) {
                if(err){ res.send(err); }
                console.log('-Found Record, Updating...');
                
                settings.name = 'meanWiki';
                settings.tagline = 'Wiki software built with AngularJS';
                settings.welcome = 'Hello. Welcome to the ng-Wiki.';
                settings.motd = 'Angular is a new and fun JS framework for buildign single page applications, like this wiki.';
                settings.homeHTML = '';
                
                settings.save(function(err, settings){
                    if(err){ res.send(err); }
                    console.log('-New Settings Saved');
                    mongooseConn.close(done);
                });
            });
        });
  });

};