//Category Factory
angular.module('ng-wiki.factories').factory('Category', ['$http', function($http) {
    return {
        // call to get all cats
        get : function() {
            return $http.get('/api/categories');
        },
        // call to POST and create a new cat
        create : function(catData) {
            return $http.post('/api/categories', catData);
        },
        // call to DELETE a cat
        delete : function(id) {
            return $http.delete('/api/categories/' + id);
        }
    };
}]);