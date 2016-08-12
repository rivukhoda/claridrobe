var host = 'http://localhost:5000/';

angular
    .module('app')
    .controller('MainController', MainController);

function MainController($scope, $http) {

    $scope.date = new Date();

    $scope.clearWardrobe = function () {
        $http.delete(host + 'images').then(function successCallback(response) {
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

        $http.post(host + 'outfits', outfit, {headers: {'Content-Type': 'application/json'}}
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
        $http.get(host + 'images/' + typeOfClothing).then(function successCallback(response) {
            var setOfClothes = {'type': typeOfClothing, 'data': response.data, 'displayIndex': undefined};
            setOfClothes.displayIndex = generateRandomIndex(setOfClothes.data.length);
            $scope.setsOfClothes.push(setOfClothes);
        });
    });


    var geo_options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};

    function geo_success(position) {
        var latitude = 'latitude=' + position.coords.latitude;
        var longitude = 'longitude=' + position.coords.longitude;

        var weatherURL = host + 'weather?' + latitude + '&' + longitude;

        $http.get(weatherURL).then(function successCallback(response) {
            var temperatureInFahrenheit = response.data['currently']['apparentTemperature'];
            var temperatureInCelsius = (temperatureInFahrenheit - 32) * (5 / 9);

            $scope.temperature = Math.ceil(temperatureInCelsius);
            $scope.weather = response.data['currently']['summary'];
        });

        var locationURL = host + 'location?' + latitude + '&' + longitude;

        $http.get(locationURL).then(function successCallback(response) {

            var area = response.data['results'][1]['address_components'][0]['short_name'];
            var city = response.data['results'][1]['address_components'][1]['long_name'];

            $scope.location = area + ', ' + city;
        });
    }

    function geo_error(err) {
        console.log(err.code + err.message);
    }

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

    $scope.deleteClothing = function () {
        this.$parent.this.clothes.splice(this.$index, 1);
        var oid = this.clothing._id.$oid;
        $http.delete(host + 'images/' + oid, {headers: {'Content-Type': 'application/json'}});
    };
}