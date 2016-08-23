angular
    .module('app')
    .controller('StyleController', StyleController);

function StyleController($scope, $http, config, dateService, geocodeService, weatherService) {

    $scope.date = dateService;

    geocodeService.then(function successCallback(address) {
        $scope.address = address;
    });

    weatherService.then(function successCallback(weather) {
        $scope.weather = weather;
    });

    $http.get(config.host + 'outfits', {headers: {'Content-Type': 'application/json'}}).then(function successCallback(response) {
        $scope.savedOutfits = response.data;
    });

    $scope.deleteOutfit = function () {
        $scope.savedOutfits.splice(this.$index, 1);
        var oid = this.outfit._id.$oid;
        $http.delete(config.host + 'outfits/' + oid, {headers: {'Content-Type': 'application/json'}});
    };

}
