//nb-wiki/main.js

var app = angular.module('ng-wiki', ['ngRoute', 'ngSanitize']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller: 'homeCtrlr'
            })

            // route for the about page
            .when('/categories/:catUrl', {
                templateUrl : 'pages/category.html',
                controller: 'catCtrlr'
            })

            // route for the about page
            .when('/pages/:pageName', {
                templateUrl : 'pages/page.html',
                controller: 'pageCtrlr'
            })

            //else
            .otherwise({ redirectTo : '/' });
    });

app.run(function($rootScope){
    $rootScope.name = "ng-Wiki (WIP)";
    
    //Dummy Data - Need to pull this data from the DB when ready.
    $rootScope.user = 'amoore';
    
    //Dummy Data for Pages and Categories all in one Object
    $rootScope.wiki = {
        categories: [  {name: 'Internal Docs',    url: 'internal-docs'}, 
                        {name: 'Agency Docs',     url: 'agency-docs'}, 
                        {name: 'Reference Docs',  url: 'ref-docs'}, 
                        {name: 'Content Guides',  url: 'content-guides'},
                        {name: 'ngWiki Tools',      url: 'wiki-tools'}
                     ],
        pages: [{  name:'Home', 
                    category: null,
                    title: 'Home', 
                    author: $rootScope.user, 
                    body: '',
                  },
                  {  name:'Categories', 
                    category: 'ngWiki Tools',
                    title:'Categories', 
                    author: $rootScope.user, 
                    body: 'A List of the categories that have been defined.',
                  }                  
                ]
    };
    
    $rootScope.emptyPage = {
        author: null,
        title: null,
        body: null        
    };
});

app.controller('homeCtrlr', function($scope){
    $scope.motd = 'Welcome to ngWiki!';
});

app.controller('catCtrlr', function($scope, $routeParams){
    var routedCat = $routeParams.catUrl;
    angular.forEach($scope.wiki.categories, function(val, key){
        if(val.url == routedCat){
            $scope.cat = val;
        }
    });
});

app.controller('pageCtrlr', function($scope, $routeParams){
    var routedTitle = $routeParams.pageName;
    angular.forEach($scope.wiki.pages, function(val, key){
        if(val.title == routedTitle){
            $scope.page = val;
        }
    });
    //$scope.page = currPage;

    $scope.showEdit = function(){
        $('#article-edit').show();
    };
});

app.controller('inputCtrlr', function($scope){
    $scope.updateArticle = function(page){
        $scope.page = page;
        $('#article-edit').hide();
    };
    $scope.clearArticle = function(){
        $scope.page = $scope.emptyPage;
    };
    $scope.cancelEdit = function(){
        $('#article-edit').hide();
    };
    
});