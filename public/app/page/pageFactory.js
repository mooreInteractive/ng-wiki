//Page Factory
angular.module('ng-wiki.factories').factory('Page', ['$http', function($http) {
    return {
        getAllForCategory : function(id) {
            return $http.get('/api/' + id + '/pages');
        },
        get : function(name){
            return $http.get('/api/page/' + name);
        },
        update : function(pageData) {
            return $http.put('/api/page/' + pageData._id, pageData);
        },
        create : function(pageData) {
            return $http.post('/api/pages', pageData);
        },
        delete : function(id) {
            return $http.delete('/api/page/' + id);
        }
    };
}]);