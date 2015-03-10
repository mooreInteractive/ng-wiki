//Home Controller

angular.module('ng-wiki.controllers')

.controller('homeController', function($scope, $rootScope, Category){
    $scope.emptyCat = {name: '', url:''};
    $scope.addingCat = false;

    Category.get().then(function (response){
        $rootScope.wiki.categories = response.data;
        //console.log($scope.wiki);
    });

    $scope.newCatForm = function(){
        $scope.addingCat = true;
        $scope.cat = angular.copy($scope.emptyCat);
    };

    $scope.newCat = function(cat){
        newURL = encodeURIComponent(cat.name.toLowerCase().replace(/ /g, '-'));
        cat.url = newURL;
        Category.create(cat);

        Category.get().then(function (response){
            $rootScope.wiki.categories = response.data;
            console.log(response.data);
        });
        

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