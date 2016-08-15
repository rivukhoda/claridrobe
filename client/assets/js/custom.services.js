angular
    .module('app')
    .factory('dateService', function () {
        var date = new Date();
        return date;
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
    .factory('geocodeService', function ($http, config) {

        return function getAddress(latitude, longitude) {

            var addressURL = config.host + 'location?latitude=' + latitude + '&longitude=' + longitude;

            $http.get(addressURL).then(function successCallback(response) {

                var address = {"area": undefined, "city": undefined};

                address['area'] = response.data['results'][1]['address_components'][0]['short_name'];
                address['city'] = response.data['results'][1]['address_components'][1]['long_name'];

                return address;

            });
        }
    })
    .factory('geolocationService', function ($http, config, weatherService, geocodeService) {

        var place = {};

        var geo_options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};

        navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

        function geo_success(position) {

            weatherService(position.coords.latitude, position.coords.longitude);
            geocodeService(position.coords.latitude, position.coords.longitude);

        }

        function geo_error(err) {
            console.log(err.code + err.message);
        }

        return place;
    });

