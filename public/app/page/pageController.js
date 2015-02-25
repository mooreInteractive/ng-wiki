//Page Controller

angular.module('ng-wiki.controllers')

.controller('pageController', function($scope, $routeParams, Page){
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

    $scope.addSection = function(page){
        page.body.push({'text':''});        
    };
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