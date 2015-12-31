//Enido Vasku
// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "Tirane ,AL";
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope','$resource','$routeParams', 'cityService', function($scope,$resource, $routeParams,cityService) {
    
    $scope.city = cityService.city;
    $scope.appid = '2de143494c0b295cca9337e1e96b00e0';
    $scope.days = $routeParams.days || '5'; 
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast",{ callback: "JSON_CALLBACK"}, { get: {method : "JSONP"}});
                                             
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city,appid: $scope.appid, cnt:$scope.days});
    
    $scope.convertToCelsius = function(degK){
        return (degK - 273).toFixed(1);
    }
    $scope.convertToDate = function(dt){
        return new Date(dt*1000);
    }
}]);
