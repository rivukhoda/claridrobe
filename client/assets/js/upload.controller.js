angular
    .module('app')
    .controller('UploadController', UploadController);

function UploadController($scope, $http, toaster) {
    $scope.field = "enter_your_link_to_image_that_you_want_to_upload";
    $scope.submit = function () {
        var data = JSON.stringify({'url': $scope.field});

        $http.post(host + 'images', data, {headers: {'Content-Type': 'application/json'}})
            .then(function successCallback(response) {
                toaster.success("Success", "Upload complete!");
            }, function errorCallback(response) {
                toaster.error("Error", "Oups, something went wrong, try again in a few minutes.");
            });
    };
}