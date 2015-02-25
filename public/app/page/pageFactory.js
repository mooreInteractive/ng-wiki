//Page Factory

angular.module('ng-wiki.factories').factory('Page', ['$http', function($http) {

    return {
        getAllForCategory : function(id) {
            return $http.get('/api/' + id + '/pages');
        },
        get : function(id){
            return $http.get('/api/page/' + id);
        },
        update : function(id) {
            return $http.put('/api/page/' + id);
        },
        create : function(pageData) {
            return $http.post('/api/pages', pageData);
        },
        delete : function(id) {
            return $http.delete('/api/pages/' + id);
        }
    }       

}]);