angular
    .module('app')
    .directive('myHeader', function () {
        return {
            templateUrl: 'my-header.html',
            restrict: 'E'
        }
    })
    .directive('myFooter', function () {
        return {
            templateUrl: 'my-footer.html',
            restrict: 'E'
        }
    });


