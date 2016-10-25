angular
    .module('app', ['toaster', 'ngAnimate', 'ngRoute'])
    .constant('config', {'host': 'http://localhost:5000/'})
    .config(function ($routeProvider) {
        $routeProvider

            .when('/gallery', {
                templateUrl: 'gallery/gallerytwo.html',
                controller: 'GalleryController'
            })

            .when('/outfit', {
                templateUrl: 'outfit/outfittwo.html',
                controller: 'OutfitController'
            })

            .when('/style', {
                templateUrl: 'style/styletwo.html',
                controller: 'StyleController'
            })

            .when('/upload', {
                templateUrl: 'upload/uploadtwo.html',
                controller: 'UploadController'
            })

            .when('/', {
                templateUrl: 'home/home.html',
            })
    });

