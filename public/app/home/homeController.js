//Home Controller

angular.module('ng-wiki.controllers')

.controller('homeController', function($scope, Category){
    $scope.emptyCat = {name: '', url:''};
    $scope.addingCat = false;

    Category.get().then(function (response){
        $scope.wiki.categories = response.data;
    });

    $scope.newCatForm = function(){
        $scope.addingCat = true;
    };
})

.controller('newCatController', function($scope, Category){
    $scope.newCat = function(cat){
        newURL = encodeURIComponent(cat.name.toLowerCase().replace(/ /g, '-'));
        cat.url = newURL;
        $scope.wiki.categories.push(cat);
        Category.create(cat);

        Category.get().then(function (response){
            $scope.wiki.categories = response.data;
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