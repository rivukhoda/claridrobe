angular
    .module('app', ['toaster', 'ngAnimate', 'ngRoute'])
    .constant('config', {'host': 'http://localhost:5000/'})
    .config(function ($routeProvider) {
        $routeProvider

            .when('/gallery', {
                templateUrl: 'gallery/shilly.html',
                controller: 'GalleryController'
            })

            .when('/outfit', {
                templateUrl: 'outfit/billy.html',
                controller: 'OutfitController'
            })

            .when('/style', {
                templateUrl: 'style/willy.html',
                controller: 'StyleController'
            })

            .when('/upload', {
                templateUrl: 'upload/silly.html',
                controller: 'UploadController'
            })

            .when('/', {
                templateUrl: 'home/home.html'
            });
    });

