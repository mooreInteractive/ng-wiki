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

app.factory('Category', ['$http', function($http) {

    return {
        // call to get all cats
        get : function() {
            return $http.get('/api/categories');
        },
        // call to POST and create a new cat
        create : function(catData) {
            return $http.post('/api/categories', catData);
        },

        // call to DELETE a cat
        delete : function(id) {
            return $http.delete('/api/categories/' + id);
        }
    }       

}]);

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

app.controller('homeCtrlr', function($scope, Category){
    $scope.emptyCat = {name: '', url:''};
    $scope.addingCat = false;

    console.log('Category:');
    console.log(Category);

    $scope.newCatForm = function(){
        $scope.addingCat = true;
    };
});

app.controller('newCatCtrlr', function($scope, Category){
    $scope.newCat = function(cat){
        newURL = encodeURIComponent(cat.name.toLowerCase().replace(/ /g, '-'));
        cat.url = newURL;
        $scope.wiki.categories.push(cat);
        Category.create(cat);

        console.log('$scope.wiki.caegories:');
        console.log($scope.wiki.categories);
        console.log('Category.get():');
        console.log(Category.get());
        

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
    var catExists = false;
    angular.forEach($scope.wiki.categories, function(val, key){
        if(val.url == routedCat){
            $scope.cat = val;
            catExists = true;
        }
    });
    if(!catExists){window.location = '#/';}

    $scope.newPageForm = function(){
        $scope.addingPage = true;
    }
});

app.controller('newPageCtrlr', function($scope){
    $scope.newPage = function(newpage){
        newpage.category = $scope.cat.name;//make this category page's category the new page's category
        
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
        $scope.wiki.homeHTML = wiki.homeHTML;
    };
    $scope.cancel = function(){
        window.location = '#/';
    }
});