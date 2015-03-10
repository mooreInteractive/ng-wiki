//Page Controller

angular.module('ng-wiki.controllers')

.controller('pageController', function($scope, $routeParams, $sce, $location, $anchorScroll, Page){
    var routedName = $routeParams.pageName;
    
    Page.get(routedName).then(function (response){
            //sanitize html sections
            response.data.body.forEach(function(elem, index, arr){
                elem.text = $sce.trustAsHtml(elem.text);
            }); 
            $scope.page = response.data;
            console.log(response.data);
        });
    
    //function to swap content areas for the corresponding inputs
    $scope.editingParam = null;

    $scope.edit = function (param, $event) {
        if ($scope.editingParam == param) {
            $scope.editingParam = null;
            $($event.currentTarget).removeClass('active');
            $scope.updateArticle($scope.page);
            
        } else {
            $scope.editingParam = param;
            $($event.currentTarget).addClass('active');
        }
    };

    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }

    $scope.addSection = function(page){
        page.body.push({'title':'section title', 'url':'section-title', 'text':'', 'date':new Date()});        
    };

    $scope.removeSection = function(section){
        $scope.page.body.splice($scope.page.body.indexOf(section), 1);
        $scope.editingParam = null;
        $scope.updateArticle($scope.page);

    }

    $scope.updateArticle = function(page){ 
        page.body.forEach(function(elem, index, arr){
            elem.url = elem.title.replace(/ /g, '-').toLowerCase();
        });
        page.name = page.title.replace(/ /g, '-').toLowerCase();
        //save to db, update page scope        
        Page.update(page).then(function (response){
            //sanitize html sections
            response.data.body.forEach(function(elem, index, arr){
                elem.text = $sce.trustAsHtml(elem.text);
            }); 
            $scope.page = response.data;
            if($scope.page.name != $location.path().substr(7, $location.path().length-7)){
                $location.path('/pages/'+$scope.page.name);
                //TODO - Update Main Navigation somehow
            }
        });
    };

    $scope.deleteArticle = function(page){
         Page.delete(page._id).then(function (response){
            $scope.page = null;
            window.location = '#/';
        });       
        
    };
    
});