angular
    .module('app')
    .factory('geocodeService', function ($http, config) {

        var location = {"area": undefined, "city": undefined};

        var geo_options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};

        navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

        function geo_success(position) {

            var latitude = 'latitude=' + position.coords.latitude;
            var longitude = 'longitude=' + position.coords.longitude;

            var locationURL = config.host + 'location?' + latitude + '&' + longitude;

            $http.get(locationURL).then(function successCallback(response) {
                
                location['area'] = response.data['results'][1]['address_components'][0]['short_name'];
                location['city'] = response.data['results'][1]['address_components'][1]['long_name'];
                
            });
        }

        function geo_error(err) {
            console.log(err.code + err.message);
        }

        return location;

    });

