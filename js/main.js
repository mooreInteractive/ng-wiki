//nb-wiki/Main.js

var app = angular.module('ng-wiki', ['ngRoute','ngSanitize']);

// configure our routes
    app.config('$routeProvider', function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html'
            })

            // route for the about page
            .when('/categories/:catName', {
                templateUrl : 'pages/page.html'
            })
    });

app.run(function($rootScope){
    $rootScope.name = "Online Production Wiki 2015";
    
    //Dummy Data - Need to pull this data from the DB when ready.
    $rootScope.user = 'Adam Moore';
    
    //Dummy Data for Pages and Categories all in one Object
    $rootScope.wiki = {
        categories: [  {name: 'Internal Docs',    url: 'internal-docs',      parent: null}, 
                        {name: 'Agency Docs',     url: 'agency-docs',      parent: null}, 
                        {name: 'Reference Docs',  url: 'ref-docs',      parent: null}, 
                        {name: 'Content Guides',  url: 'content-guides',      parent: null},
                        {name: 'Wiki Tools',      url: 'wiki-tools',      parent: null}
                     ],
        pages: [{  name:'Home', 
                    category: null, 
                    author: $rootScope.user, 
                    body: '',
                  },
                  {  name:'Categories', 
                    category: 'Wiki Tools', 
                    author: $rootScope.user, 
                    body: '',
                  }                  
                ]
    }
    
    $rootScope.emptyPage = {
        author: null,
        title: null,
        body: null        
    };
});

app.controller('pageCtrlr', function($scope, $routeParams){
    $scope.page = angular.copy($scope.emptyPage);
    $scope.page.name = $routeParams.catName;
    $scope.showEdit = function(){
        $('#article-edit').show();
        $scope.page.author = $scope.user;
    };
});

app.controller('inputCtrlr', function($scope){
    $scope.updateArticle = function(page){
        $scope.page = page; //angular.copy(page);
        $('#article-edit').hide();
    };
    $scope.clearArticle = function(){
        $scope.page = $scope.emptyPage;
    };
    $scope.cancelEdit = function(){
        $('#article-edit').hide();
    };
    
});