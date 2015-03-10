//Main App Routing

angular.module('ng-wiki.routes').config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'app/home/homeView.html',
                controller: 'homeController'
            })

            // route for the about page
            .when('/categories/:catUrl', {
                templateUrl : 'app/category/categoryView.html',
                controller: 'catController'
            })

            // route for the about page
            .when('/pages/:pageName', {
                templateUrl : 'app/page/pageView.html',
                controller: 'pageController'
            })

            // route for the about page
            .when('/settings', {
                templateUrl : 'app/settings/settingsView.html',
                controller: 'settingsController'
            })

            //else
            .otherwise({ redirectTo : '/' });
    });