//Settings Controller

angular.module('ng-wiki.controllers')

.controller('settingsController', function($scope, $rootScope, Settings){

    $scope.save = function(savedSettings){        
        Settings.update(savedSettings).then(function(response){
            $rootScope.wiki.name     = response.data.name;
            $rootScope.wiki.tagline  = response.data.tagline;
            $rootScope.wiki.welcome  = response.data.welcome;
            $rootScope.wiki.motd     = response.data.motd;
            $rootScope.wiki.homeHTML = response.data.homeHTML;
        });
    };
    
    $scope.cancel = function(){
        window.location = '#/';
    };
    
    $scope.clearDB = function(){
        Settings.deleteAll().then(function (response){
            $scope.wiki.categories = [];
            $scope.wiki.pages = [];
        });        
        window.location = '#/';
    };
    
    $scope.updateTempSettings = function(){
        $scope.tempSettings = {
            'name': $scope.wiki.name,
            'tagline': $scope.wiki.tagline,
            'welcome': $scope.wiki.welcome,
            'motd': $scope.wiki.motd,
            'homeHTML': $scope.wiki.homeHTML
        };
    };
    
    $scope.updateTempSettings();
});