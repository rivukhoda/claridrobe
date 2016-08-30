angular
    .module('app')
    .directive('myHeader', function () {
        return {
            templateUrl: '../common/my-header.html',
            restrict: 'E',
            scope: {title: '@'}
        }
    })
    .directive('myFooter', function () {
        return {
            templateUrl: '../common/my-footer.html',
            restrict: 'E'
        }
    })
    .directive('myGreeter', function () {
        return {
            templateUrl: '../common/my-greeter.html',
            restrict: 'E',
            scope: {greeting: '@'},
            controller: 'GreetingController'
        };
    });


