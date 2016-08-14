angular
    .module('app')
    .controller('StyleController', StyleController);

function StyleController($scope, $http) {

    $scope.date = new Date();
    $scope.saved = null;

    $http.get(config.host + 'outfits', {headers: {'Content-Type': 'application/json'}}).then(function successCallback(response) {
        $scope.savedOutfits = response.data;
    });

    $scope.deleteOutfit = function () {
        $scope.savedOutfits.splice(this.$index, 1);
        var oid = this.outfit._id.$oid;
        $http.delete(config.host + 'outfits/' + oid, {headers: {'Content-Type': 'application/json'}});
    };

}
