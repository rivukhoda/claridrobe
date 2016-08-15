angular
    .module('app')
    .controller('MainController', MainController);

function MainController($scope, $http, config, geocodeService) {

    $scope.date = new Date();

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

    $scope.typesOfClothing = ['shirt', 'pants', 'footwear', 'jacket'];
    $scope.setsOfClothes = [];

    $scope.typesOfClothing.forEach(function (typeOfClothing) {
        $http.get(config.host + 'images/' + typeOfClothing).then(function successCallback(response) {
            var setOfClothes = {'type': typeOfClothing, 'data': response.data, 'displayIndex': undefined};
            setOfClothes.displayIndex = generateRandomIndex(setOfClothes.data.length);
            $scope.setsOfClothes.push(setOfClothes);
        });
    });

    $scope.deleteClothing = function () {
        this.$parent.this.clothes.splice(this.$index, 1);
        var oid = this.clothing._id.$oid;
        $http.delete(config.host + 'images/' + oid, {headers: {'Content-Type': 'application/json'}});
    };

    $scope.location = geocodeService;
}