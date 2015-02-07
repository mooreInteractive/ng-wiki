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
        motd: 'Welcome to ng-Wiki, Try making a new Category!',
        categories: [{name: 'ngWiki Tools',      url: 'wiki-tools'}],
        pages: [{   name:'Home', 
                    category: null,
                    title: 'Home', 
                    author: $rootScope.user, 
                    body: ''
                  },
                  { name:'categories', 
                    category: 'ngWiki Tools',
                    title:'Categories', 
                    author: 'ng-Wiki System', 
                    body: 'A List of the categories that have been defined.'
                  },
                  { name:'ng-wiki-settings', 
                    category: 'ngWiki Tools',
                    title:'ng-Wiki Settings', 
                    author: 'ng-Wiki System', 
                    body: 'Customize the settings for your Wiki on this page.'
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
    $scope.motd = $scope.wiki.motd;
    $scope.emptyCat = {name: '', url:''};
    $scope.addingCat = false;

    $scope.newCatForm = function(){
        $scope.addingCat = true;
    };
});

app.controller('newCatCtrlr', function($scope){
    $scope.newCat = function(cat){
        $scope.wiki.categories.push(cat);
        $scope.addingCat = false;
    };
    $scope.clear = function(){
        $scope.cat = angular.copy($scope.emptyCat);
    };
    $scope.cancel = function(){
        $scope.cat = angular.copy($scope.emptyCat);
        $scope.addingCat = false;
    };
    
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
    $scope.editingPage = false;
    var routedName = $routeParams.pageName;
    angular.forEach($scope.wiki.pages, function(val, key){
        if(val.name == routedName){
            $scope.page = val;
        }
    });
    //$scope.page = currPage;

    $scope.showEdit = function(){
        $scope.editingPage = true;
    };
});

app.controller('inputCtrlr', function($scope){
    $scope.updateArticle = function(page){
        $scope.page = page;
        $scope.editingPage = false;
    };
    $scope.clearArticle = function(){
        $scope.page = angular.copy($scope.emptyPage);
    };
    $scope.deleteArticle = function(page){
        $scope.editingPage = false;
        pagesArr = $scope.wiki.pages;
        pagesArr.splice(pagesArr.indexOf(page), 1);
        window.location = '#/';
    };
    $scope.cancelEdit = function(){
        $scope.editingPage = false;
    };
    
});