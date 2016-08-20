angular
    .module('app')
    .controller('MainController', MainController);

function MainController($scope, $http, config, geocodeService, weatherService, dateService, clothingService) {

    $scope.date = dateService;

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

    $scope.saveOutfit = function () {
        var outfit = {'clothes': [], 'date': $scope.date};

        $scope.setsOfClothes.forEach(function (setOfClothes) {
            var clothingOnDisplay = setOfClothes.data[setOfClothes.displayIndex].url;
            outfit.clothes.push({'url': clothingOnDisplay});
        });

        $http.post(config.host + 'outfits', outfit, {headers: {'Content-Type': 'application/json'}}
        ).then(function successCallback(response) {
            $scope.message = 'Outfit Saved!'
        }, function errorCallback(response) {
            $scope.message = 'Save Failed...'
        })
    };

    $scope.generateRandomIndices = function () {
        $scope.setsOfClothes.forEach(function (setOfClothes) {
            setOfClothes.displayIndex = generateRandomIndex(setOfClothes.data.length);
        });
    };

    function generateRandomIndex(maxValue) {
        return Math.floor(Math.random() * maxValue);
    }

    $scope.setsOfClothes = clothingService;
    
    $scope.deleteClothing = function () {
        this.$parent.this.clothes.splice(this.$index, 1);
        var oid = this.clothing._id.$oid;
        $http.delete(config.host + 'images/' + oid, {headers: {'Content-Type': 'application/json'}});
    };

}