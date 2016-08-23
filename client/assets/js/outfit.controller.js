angular
    .module('app')
    .controller('OutfitController', OutfitController);

function OutfitController($scope, $http, config, dateService, geocodeService, weatherService, clothingService) {

    $scope.date = dateService;

    $scope.setsOfClothes = clothingService;

    geocodeService.then(function successCallback(address) {
        $scope.address = address;
    });
    weatherService.then(function successCallback(weather) {
        $scope.weather = weather;
    });


    $scope.generateRandomIndices = function () {
        $scope.setsOfClothes.forEach(function (setOfClothes) {
            setOfClothes.displayIndex = generateRandomIndex(setOfClothes.data.length);
        });
    };

    function generateRandomIndex(maxValue) {
        return Math.floor(Math.random() * maxValue);
    }

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
}
