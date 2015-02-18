//Category Controller

angular.module('ng-wiki.controllers')

.controller('catController', function($scope, $routeParams){
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
})

.controller('newPageController', function($scope){
    $scope.newpage = angular.copy($scope.emptyPage);
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

