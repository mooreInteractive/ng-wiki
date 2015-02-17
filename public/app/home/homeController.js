//Home Controller

angular.module('ng-wiki.controllers')

.controller('homeController', function($scope, Category){
    $scope.emptyCat = {name: '', url:''};
    $scope.addingCat = false;

    console.log('Category:');
    console.log(Category);

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