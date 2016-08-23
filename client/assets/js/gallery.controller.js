angular
    .module('app')
    .controller('GalleryController', GalleryController);

function GalleryController($scope, $http, config, geocodeService, weatherService, dateService, clothingService) {

    $scope.date = dateService;

    $scope.setsOfClothes = clothingService;

    geocodeService.then(function successCallback(address) {
        $scope.address = address;
    });
    weatherService.then(function successCallback(weather) {
        $scope.weather = weather;
    });

    $scope.clearWardrobe = function () {
        $http.delete(config.host + 'images').then(function successCallback(response) {
            $scope.setsOfClothes.forEach(function (setOfClothes) {
                setOfClothes.data = null;
            })
        });
    };
    
    $scope.deleteClothing = function () {
        this.$parent.this.setOfClothes.data.splice(this.$index, 1);
        var oid = this.clothing._id.$oid;
        $http.delete(config.host + 'images/' + oid, {headers: {'Content-Type': 'application/json'}});
    };

}