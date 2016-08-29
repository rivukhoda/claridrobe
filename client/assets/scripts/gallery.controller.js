angular
    .module('app')
    .controller('GalleryController', GalleryController);

function GalleryController($scope, $http, config, clothingService) {

    $scope.setsOfClothes = clothingService;

    $scope.clearWardrobe = function () {
        $http.delete(config.host + 'images').then(function successCallback(response) {
            $scope.setsOfClothes.forEach(function (setOfClothes) {
                setOfClothes.data = null;
            })
        });
    };

    $scope.deleteClothing = function () {
        this.$parent.this.setOfClothes.data.splice(this.$index, 1);
        var oid = this.clothing._id.$oid;
        $http.delete(config.host + 'images/' + oid, {headers: {'Content-Type': 'application/json'}});
    };

}