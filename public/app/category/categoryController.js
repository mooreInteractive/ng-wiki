//Category Controller

angular.module('ng-wiki.controllers')

.controller('catController', function($scope, $rootScope, $routeParams, Category, Page){
    var routedCat = $routeParams.catUrl;
    var catExists = false;
    $scope.catDeleteWarning = false;
    $scope.catDeleteWarningMsg = '';
    $scope.thisCatPages = [];
    
    angular.forEach($scope.wiki.categories, function(val, key){
        if(val.url == routedCat){
            $scope.cat = val;
            catExists = true;
        }
    });
    
    if(!catExists){window.location = '#/';} else {
        Page.getAllForCategory($scope.cat._id).then(function (response){
            $scope.thisCatPages = response.data;
        });
    }

    $scope.newPageForm = function(){
        $scope.addingPage = true;
        $scope.newpage = angular.copy($scope.emptyPage);
    };
    
    $scope.deleteCat = function(cat){
        //Check to see if there are pages in the category first
                
        if($scope.thisCatPages.length > 0){
            Category.delete(cat._id).then(function (response){
                $rootScope.wiki.categories = response.data;
            });        
            window.location = '#/';
        } else {
            $scope.catDeleteWarningMsg = 'You cannot delete a category that contains pages.';
            $scope.catDeleteWarning = true;
        }
    };
    
    $scope.newPage = function(newpage){
        newpage.category = $scope.cat._id;//make this category page's category the new page's category
        
        newpage.name = encodeURIComponent(newpage.title.toLowerCase().replace(/ /g, '-'));
        //set the author as currUser - still dummy data 
        newpage.author = $scope.user;
        newpage.created_date = newpage.modified_date = new Date();
        
        Page.create(newpage);
        Page.getAllForCategory($scope.cat._id).then(function (response){
            $scope.thisCatPages = response.data;
            angular.forEach(response.data, function(val, index){
                $rootScope.wiki.pages.push(val);
            });
        });
        
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
