angular
    .module('app')
    .directive('mylogin', function () {
        return {
            templateUrl: '/client/app/login/login.html',
            restrict: 'E',
            scope: {title: '@'}
        }
    });