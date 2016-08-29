angular
    .module('app')
    .controller('StyleController', StyleController);

function StyleController($scope, $http, config, outfitService) {

    $scope.savedOutfits = outfitService;
    outfitService.then(function successCallback(savedOutfits) {
        $scope.savedOutfits = savedOutfits;
    });

    $scope.deleteOutfit = function () {
        $scope.savedOutfits.splice(this.$index, 1);
        var oid = this.outfit._id.$oid;
        $http.delete(config.host + 'outfits/' + oid, {headers: {'Content-Type': 'application/json'}});
    };

}
