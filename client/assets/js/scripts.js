function MainController($scope, $http) {

    $scope.date = new Date();

    $scope.clear = function () {
        $http.get('http://localhost:5000/delete_all')
            .success(function (data) {
                $scope.message = 'Wardrobe Cleared!';
                $window.location.reload();
            })
            .error(function (data, status, error, config) {
                $scope.message = [{heading: "Error", description: "Could not load json data..."}];
            });
    };

    $scope.saveOutfit = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:5000/outfits',
            headers: {'Content-Type': 'application/json'},
            data: {
                'clothes': [
                    {'url': $scope.shirts[$scope.shirtIndex].url},
                    {'url': $scope.pants[$scope.pantIndex].url},
                    {'url': $scope.jackets[$scope.jacketIndex].url},
                    {'url': $scope.shoes[$scope.shoeIndex].url}
                ],
                'date': $scope.date
            }
        }).then(function successCallback(response) {
            $scope.message = 'Outfit Saved!'
        }, function errorCallback(response) {
            $scope.message = 'Save Failed...'
        });
    };

    $scope.generateRandomOutfit = function () {

        $scope.shirtIndex = generateRandomIndex($scope.shirts.length);
        $scope.pantIndex = generateRandomIndex($scope.pants.length);
        $scope.jacketIndex = generateRandomIndex($scope.jackets.length);
        $scope.shoeIndex = generateRandomIndex($scope.shoes.length);
    };

    function generateRandomIndex(maxValue) {
        return Math.floor(Math.random() * maxValue)
    };

    $http.get('http://localhost:5000/images/shirt')
        .success(function (data) {
            $scope.shirts = data;
            $scope.shirtIndex = generateRandomIndex($scope.shirts.length);
        })
        .error(function (data, status, error, config) {
            $scope.shirts = [{heading: "Error", description: "Could not load json data"}];
        });
    $http.get('http://localhost:5000/images/pants')
        .success(function (data) {
            $scope.pants = data;
            $scope.pantIndex = generateRandomIndex($scope.pants.length);
        })
        .error(function (data, status, error, config) {
            $scope.pants = [{heading: "Error", description: "Could not load json data"}];
        });
    $http.get('http://localhost:5000/images/footwear')
        .success(function (data) {
            $scope.shoes = data;
            $scope.shoeIndex = generateRandomIndex($scope.shoes.length);
        })
        .error(function (data, status, error, config) {
            $scope.shoes = [{heading: "Error", description: "Could not load json data"}];
        });
    $http.get('http://localhost:5000/images/jacket')
        .success(function (data) {
            $scope.jackets = data;
            $scope.jacketIndex = generateRandomIndex($scope.jackets.length);
        })
        .error(function (data, status, error, config) {
            $scope.jackets = [{heading: "Error", description: "Could not load json data"}];
        });

}

function StyleController($scope, $http) {

    $scope.date = new Date();
    $scope.saved = null;

    $http.get('http://localhost:5000/outfits', {headers: {'Content-Type': 'application/json'}})
        .success(function (data) {
            $scope.savedOutfits = data;
        })
        .error(function (data, status, error, config) {
            $scope.savedOutfits = [{heading: "Error", description: "Could not load json data"}];
        });
}

function UploadController($scope, $http, toaster) {
    $scope.field = "enter_your_link_to_image_that_you_want_to_upload";
    $scope.submit = function () {
        var data = JSON.stringify({'url': $scope.field});
        $http.post('http://localhost:5000/upload', data, {headers: {'Content-Type': 'application/json'}}).success(function (data, status) {
            toaster.success("Success", "Upload complete!");
        })
            .error(function (data, status, error, config) {
                toaster.error("Error", "Could not load json data.");
            });
    }
}

var upload = angular.module('Upload', ['toaster', 'ngAnimate']);

upload.directive('httpPrefix', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if (value && !/^(https?):\/\//i.test(value)
                    && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
            }

            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.splice(0, 0, ensureHttpPrefix);
        }
    };
});