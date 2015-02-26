//Page Controller

angular.module('ng-wiki.controllers')

.controller('pageController', function($scope, $routeParams, Page){
    $scope.editingPage = false;
    var routedName = $routeParams.pageName;
    
    Page.get(routedName).then(function (response){
            $scope.page = response.data;
            console.log(response.data);
        });
    //$scope.page = currPage;

    $scope.showEdit = function(){
        $scope.editingPage = true;
    };

    $scope.addSection = function(page){
        page.body.push({'text':'', 'date':new Date()});        
    };
    $scope.updateArticle = function(page){        
        Page.update(page).then(function (response){
            $scope.page = response.data;        
            $scope.editingPage = false;
        });
    };
    $scope.clearArticle = function(){
        $scope.page = angular.copy($scope.emptyPage);
    };
    $scope.deleteArticle = function(page){
         Page.delete(page._id).then(function (response){
            $scope.page = null;        
            $scope.editingPage = false;
            window.location = '#/';
        });       
        
    };
    $scope.cancelEdit = function(){
        $scope.editingPage = false;
    };
    
});