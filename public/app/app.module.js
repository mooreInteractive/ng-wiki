//app,module.js - Main Angular JS Initialization, replaced main.js

var app = angular.module('ng-wiki', ['ngRoute', 'ngSanitize', 'ng-wiki.controllers', 'ng-wiki.factories', 'ng-wiki.routes']);

// located at /app/-section-/-section-Controller.js
angular.module('ng-wiki.controllers', []);

// located at /app/-section-/-section-Factory.js
angular.module('ng-wiki.factories', []);

// located at /app/app.routes.js
angular.module('ng-wiki.routes', []);


app.run(function($rootScope, $http){
    //Dummy Data - Need to pull this data from the DB when ready.
    $rootScope.user = 'amoore';
    
    //DUmmy data from JSON file
    $http.get('data/wiki.json')
       .then(function(res){
          $rootScope.wiki = res.data;
        });


    
    $rootScope.emptyPage = {
        author: null,
        title: null,
        body: null,
        name: null,
        category: 'General'        
    };

    $rootScope.goHome = function(){
        window.location = '#/';
    }
});