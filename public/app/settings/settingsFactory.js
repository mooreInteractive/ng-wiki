//WikiSettings Factory

angular.module('ng-wiki.factories').factory('Settings', ['$http', function($http) {

    return {
        // call to get all cats
        get : function() {
            return $http.get('/api/settings');
        },
        update : function(settingsData){
            return $http.put('/api/settings', settingsData);
        },        
        deleteAll : function() {
            return $http.delete('/api/cleardb');
        }
    }       

}]);