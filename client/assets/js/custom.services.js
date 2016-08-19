angular
    .module('app')
    .factory('dateService', function () {
        return new Date();
    })
    .factory('weatherService', function ($http, config) {

        return function getWeather(latitude, longitude) {

            var weatherURL = config.host + 'weather?latitude=' + latitude + '&longitude=' + longitude;

            $http.get(weatherURL).then(function successCallback(response) {

                var temperatureInFahrenheit = response.data['currently']['apparentTemperature'];
                var temperatureInCelsius = (temperatureInFahrenheit - 32) * (5 / 9);

                var weather = {"condition": undefined, "temperature": undefined};

                weather['condition'] = response.data['currently']['summary'];
                weather['temperature'] = Math.ceil(temperatureInCelsius);

                return weather;
            });
        }
    })
    .factory('geolocationService', function ($http, config, $q) {

        var deferred = $q.defer();

        function geo_success(position) {
            deferred.resolve(position);
        }

        function geo_error(err) {
            deferred.reject(err);
        }

        var geo_options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};

        navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

        return deferred.promise;

    })
    .factory('geocodeService', function ($http, config, geolocationService) {

        var promiseGeocode = geolocationService.then(function getAddress(position) {

            var latitude = 'latitude=' + position.coords.latitude;
            var longitude = 'longitude=' + position.coords.longitude;
            var addressURL = config.host + 'location?' + latitude + '&' + longitude;

            var promiseAddress = $http.get(addressURL).then(function successCallback(response) {

                var address = {"area": undefined, "city": undefined};

                address['area'] = response.data['results'][1]['address_components'][0]['short_name'];
                address['city'] = response.data['results'][1]['address_components'][1]['long_name'];

                return address;
            });
            return promiseAddress;
        });
        return promiseGeocode;
    });

