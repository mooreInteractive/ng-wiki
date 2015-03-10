//app,module.js - Main Angular JS Initialization, replaced main.js

var app = angular.module('ng-wiki', ['ngRoute', 'ngSanitize', 'ng-wiki.controllers', 'ng-wiki.factories', 'ng-wiki.routes']);

// located at /app/-section-/-section-Controller.js
angular.module('ng-wiki.controllers', []);

// located at /app/-section-/-section-Factory.js
angular.module('ng-wiki.factories', []);

// located at /app/app.routes.js
angular.module('ng-wiki.routes', []);


app.run(function($rootScope, Page, Category, Settings){
    //Dummy Data - Need to pull this data from the DB when ready.
    $rootScope.user = 'amoore';
    
    Settings.get()
       .then(function(res){
          $rootScope.wiki = res.data[0];
          $rootScope.wiki.categories = [];
          $rootScope.wiki.pages = [];
          console.log(res.data);
        })
       .then(function(){
           Category.get().then(function (response){
            $rootScope.wiki.categories = response.data;
            angular.forEach($rootScope.wiki.categories, function(val){
                Page.getAllForCategory(val._id).then(function (response){
                    angular.forEach(response.data, function(val){
                        $rootScope.wiki.pages.push(val);
                    });                    
                    //console.log(response.data);
                    //console.log($rootScope.wiki.pages);
                });
            });
        }); 
       });
    
    $rootScope.emptyPage = {
        author: null,
        title: null,
        body: [{'text':null}],
        name: null,
        category: 'General'        
    };

    $rootScope.goHome = function(){
        window.location = '#/';
    };
});