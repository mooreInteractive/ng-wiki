//Settings Controller

angular.module('ng-wiki.controllers').controller('settingsController', function($scope){
    
    $scope.tempSettings = {
        'name': $scope.wiki.name,
        'tagline': $scope.wiki.tagline,
        'welcome': $scope.wiki.welcome,
        'motd': $scope.wiki.motd,
        'homeHTML': $scope.wiki.homeHTML
    }
    
    $scope.save = function(savedSettings){
        $scope.wiki.name = savedSettings.name;
        $scope.wiki.tagline = savedSettings.tagline;
        $scope.wiki.welcome = savedSettings.welcome;
        $scope.wiki.motd = savedSettings.motd;
        $scope.wiki.homeHTML = savedSettings.homeHTML;
    };
    
    $scope.cancel = function(){
        window.location = '#/';
    }
});