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

            // route for the about page
            .when('/settings', {
                templateUrl : 'pages/settings.html',
                controller: 'settingsCtrlr'
            })

            //else
            .otherwise({ redirectTo : '/' });
    });

app.run(function($rootScope){
    //Dummy Data - Need to pull this data from the DB when ready.
    $rootScope.user = 'amoore';
    
    //Dummy Data for Pages and Categories all in one Object
    $rootScope.wiki = {
        name: 'ng-Wiki',
        tagline: 'Wikipedia software built with AngularJS',
        motd: 'Welcome to ng-Wiki, Try making a new Category!',
        welcome: 'ng-Wiki is a free and open source wiki software created with AngularJS. Currrently a fledgling work in progress. The goal is for this application to be reusable and free. Created by Adam Moore and George Hong 2015.',
        categories: [{name:'General', url:'general'}],
        pages: []
    };
    
    $rootScope.emptyPage = {
        author: null,
        title: null,
        body: null        
    };

    $rootScope.goHome = function(){
        window.location = '#/';
    }
});

app.controller('homeCtrlr', function($scope){
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

    $scope.newPageForm = function(){
        $scope.addingPage = true;
    }
});

app.controller('newPageCtrlr', function($scope){
    $scope.newPage = function(newpage){
        newpage.category = $scope.cat.name;//make this category page's category the new page's category
        //create the name(url) of the page automatically by transformign to lower case, replacing spaces with dashes, and then urlencoding the whole thing.
        newpage.name = encodeURIComponent(newpage.title.toLowerCase().replace(/ /g, '-'));
        //set the author as currUser - still dummy data 
        newpage.author = $scope.user;

        $scope.wiki.pages.push(newpage);
        $scope.addingPage = false;
    };
    $scope.clear = function(){
        $scope.newpage = angular.copy($scope.emptyPage);
    };
    $scope.cancel = function(){
        $scope.newpage = angular.copy($scope.emptyPage);
        $scope.addingPage = false;
    };
    
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

app.controller('settingsCtrlr', function($scope){

    $scope.save = function(wiki){
        $scope.wiki.name = wiki.name;
        $scope.wiki.tagline = wiki.tagline;
        $scope.wiki.welcome = wiki.welcome;
        $scope.wiki.motd = wiki.motd;
    };
    $scope.cancel = function(){
        window.location = '#/';
    }
});