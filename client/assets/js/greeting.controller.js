angular
    .module('app')
    .controller('GreetingController', GreetingController);

function GreetingController($scope, dateService, geocodeService, weatherService) {
    $scope.date = dateService;

    geocodeService.then(function successCallback(address) {
        $scope.address = address;
    });

    weatherService.then(function successCallback(weather) {
        $scope.weather = weather;
    });
}
