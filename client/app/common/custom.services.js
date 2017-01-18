angular
    .module('app')

    .factory('dateService', function () {
        return new Date();
    })

    .factory('geolocationService', function ($http, $q) {

        var deferred = $q.defer();

        function geo_success(position) {
            deferred.resolve(position);
        }

        function geo_error(err) {
            deferred.reject(err);
        }

        var geo_options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 60000};

        navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

        return deferred.promise;

    })

    .factory('geocodeService', function ($http, config, geolocationService) {

        var promiseGeocode = geolocationService.then(function getAddress(position) {

            var latitude = 'latitude=' + position.coords.latitude;
            var longitude = 'longitude=' + position.coords.longitude;
            var addressURL = config.host + 'location?' + latitude + '&' + longitude;

            var promiseGeocodeAPI = $http.get(addressURL, {cache: true}).then(function successCallback(response) {

                var address = {"area": undefined, "city": undefined};

                address['area'] = response.data['results'][1]['address_components'][0]['short_name'];
                address['city'] = response.data['results'][1]['address_components'][1]['long_name'];

                return address;
            });
            return promiseGeocodeAPI;
        });
        return promiseGeocode;
    })

    .factory('weatherService', function ($http, config, geolocationService) {

        var promiseWeather = geolocationService.then(function getWeather(position) {

            var latitude = 'latitude=' + position.coords.latitude;
            var longitude = 'longitude=' + position.coords.longitude;
            var weatherURL = config.host + 'weather?' + latitude + '&' + longitude;

            var promiseWeatherAPI = $http.get(weatherURL, {cache: true}).then(function successCallback(response) {

                var temperatureInFahrenheit = response.data['currently']['apparentTemperature'];
                var temperatureInCelsius = (temperatureInFahrenheit - 32) * (5 / 9);

                var weather = {"condition": undefined, "temperature": undefined};

                weather['condition'] = response.data['currently']['summary'];
                weather['temperature'] = Math.ceil(temperatureInCelsius);

                return weather;
            });
            return promiseWeatherAPI;
        });
        return promiseWeather;
    })

    .factory('clothingService', function ($http, config) {
        var typesOfClothing = ['shirt', 'pants', 'skirt', 'dress', 'footwear', 'jacket'];
        var setsOfClothes = [];

        typesOfClothing.forEach(function (typeOfClothing) {
            $http.get(config.host + 'images/' + typeOfClothing).then(function successCallback(response) {

                var setOfClothes = {'type': typeOfClothing, 'data': response.data, 'displayIndex': undefined};
                setOfClothes.displayIndex = generateRandomIndex(setOfClothes.data.length);
                setsOfClothes.push(setOfClothes);
            });
        });
        return setsOfClothes;
    })

    .factory('outfitService', function ($http, config) {
        return $http.get(config.host + 'outfits', {headers: {'Content-Type': 'application/json'}})
            .then(function successCallback(response) {
                return response.data;
            });
    });


function generateRandomIndex(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

