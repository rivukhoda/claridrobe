angular
    .module('app')
    .directive('myHeader', function () {
        return {
            templateUrl: '/claridrobe/client/app/common/my-header.html',
            restrict: 'E',
            scope: {title: '@'}
        }
    })
    .directive('myFooter', function () {
        return {
            templateUrl: '/claridrobe/client/app/common/my-footer.html',
            restrict: 'E'
        }
    })
    .directive('myGreeter', function () {
        return {
            templateUrl: '/claridrobe/client/app/common/my-greeter.html',
            restrict: 'E',
            scope: {greeting: '@'},
            controller: 'GreetingController'
        };
    });


