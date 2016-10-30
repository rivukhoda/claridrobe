angular
    .module('app')
    .directive('myHeader', function () {
        return {
            templateUrl: '/client/app/common/my-header.html',
            restrict: 'E',
            scope: {title: '@'}
        }
    })
    .directive('myFooter', function () {
        return {
            templateUrl: '/client/app/common/my-footer.html',
            restrict: 'E'
        }
    })
    .directive('myGreeter', function () {
        return {
            templateUrl: '/client/app/common/my-greeter.html',
            restrict: 'E',
            scope: {greeting: '@'},
            controller: 'GreetingController'
        };
    })
    .directive('myNav', function () {
        return {
            templateUrl: '/client/app/common/my-nav.html',
            restrict: 'E'
        }
    });


