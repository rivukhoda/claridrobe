function MainController($scope, $http) {
   $scope.date = new Date();
   $scope.savemessage="";
   $scope.getRandomIndex = function(length){
       return Math.floor(Math.random() * length);
   }
   
   $scope.clear = function(){
       $http.get('http://localhost:5000/delete_all')
   .success(function(data) {
       $scope.message='Wardrobe Cleared!';
        $window.location.reload();
   })
   .error(function(data,status,error,config){
       $scope.message = [{heading:"Error", description:"Could not load json data..."}];
   });
   }  

//       $scope.save = function(){
//     $http({
//   method: 'POST',
//   url: 'http://localhost:8080/image/save',
//   data: 'field1'
// }).then(function successCallback(response) {
//    $scope.message = 'Outfit Saved!'
//   }, function errorCallback(response) {
//    $scope.message = 'Save Failed...'
//   });
//    }; 


       $scope.shirtIndex =0;
       $scope.pantIndex = 0;
       $scope.shoeIndex = 0;
       $scope.jacketIndex = 0;

       $scope.shirts = null;
       $scope.pants = null;
       $scope.shoes = null;
       $scope.jackets = null;
   
     

       $http.get('http://localhost:5000/images/shirt')
       .success(function(data) {
           $scope.shirts = JSON.parse(data);
           console.log($scope.shirts);
           console.log($scope.shirts[0]);
           console.log($scope.shirts.length);
       })
       .error(function(data,status,error,config){
           $scope.shirts = [{heading:"Error", description:"Could not load json data"}];
       });
         $http.get('http://localhost:5000/images/pants')
       .success(function(data) {
           $scope.pants=data;
       })
       .error(function(data,status,error,config){
           $scope.pants = [{heading:"Error", description:"Could not load json data"}];
       });
         $http.get('http://localhost:5000/images/footwear')
       .success(function(data) {
           $scope.shoes=data;
       })
       .error(function(data,status,error,config){
           $scope.shoes = [{heading:"Error", description:"Could not load json data"}];
       });
         $http.get('http://localhost:5000/images/jacket')
       .success(function(data) {
           $scope.jackets=data;
       })
       .error(function(data,status,error,config){
           $scope.jackets = [{heading:"Error", description:"Could not load json data"}];
       });

 
};
function StyleCtl($scope, $http) {
       $scope.saved = null;
    $http.get('assets/json/saved.json')
       .success(function(data) {
           $scope.saved=data;
       })
       .error(function(data,status,error,config){
           $scope.saved = [{heading:"Error", description:"Could not load json data"}];
       });
}

function UploadController($scope, $http) {
      $scope.field1 = "foo";
      $scope.submit = function() {
      var data = JSON.stringify({'url': $scope.field1});
      $http.post("http://localhost:5000/upload", data, {headers:{'Content-Type':'application/json'}}).success(function(data,status) {
           $scope.field1 = "success";
     })
       .error(function(data,status,error,config){
           $scope.field1 = [{heading:"Error", description:"Could not load json data"}];
       });
   }
};

   var upload = angular.module('Upload', []);

  upload.directive('httpPrefix', function() {
   return {
       restrict: 'A',
       require: 'ngModel',
       link: function(scope, element, attrs, controller) {
           function ensureHttpPrefix(value) {
               // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
               if(value && !/^(https?):\/\//i.test(value)
                  && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0 ) {
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