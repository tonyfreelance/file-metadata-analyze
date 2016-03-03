(function() {
    var myApp = angular.module('ImageSearchApp', ['ngRoute'])
    
    myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true)
        $routeProvider
            .when('/search', {
                templateUrl: 'partial/search',
                controller: 'ImageSearchController'
            })
            .when('/history', {
                templateUrl: 'partial/history',
                controller: 'SearchHistoryController'
            })
            .otherwise({
                redirectTo: '/search'
            })
    }])

    myApp.controller('ImageSearchController', ['$scope', '$http', function($scope, $http) {
        var page = 1
        // Get the images from server
        var fetchImages = function(){
            $http.get('/search', {
                params: {
                    search: $scope.searchTerm,
                    offset: page
                }
            })
            .then(function(res) {
                $scope.images = res.data
            }, function(err){
                $scope.fetchImageErr = err
            })
        }
        
        $scope.getImages = fetchImages
        
        $scope.getNext = function() {
            page++
            fetchImages()
        }
        
        $scope.getBack = function() {
            page--
            fetchImages()
        }
    }])
    
    myApp.controller('SearchHistoryController', ['$scope', '$http', function($scope, $http, $templateCache) {
        $http.get('/history')
                .then(function(res){
                    $scope.terms = res.data
                }, function(err){
                    $scope.err = err
                })
    }])
})()