// function ImagePickerCtrl($scope) {
//     $scope.all_images = [1,2,3,4,5,6,7,8,9,10];

//     $scope.selectImage = function (image) {
//         if($scope.selected_image === image) {
//             $scope.selected_image = '';
//         }
//         else {
//             $scope.selected_image = image;
//         }
//     }
// }

  angular.module("outfit", [])
         
         .controller("MainController", function($scope) {

	$scope.getRandomIndex = function(length){
		return Math.floor(Math.random() * length);
	}

	$scope.clothing = [
	{
		type:"Shirt", 
		src:"shirt"
	},
	{	
		type: "Pants",
		src:"pants"
	}, 
	{
		type: "Jacket",
		src:"jacket"
	},
	{
		type:"Shoes",
		src:"shoes"
	}];
	$scope.foo = [
	{
		value: "Shirt_A",
	},
	{
		value: "Shirt_B",
	},
	{
		value: "Shirt_C",
	},
	];

	$scope.shirts = [
	{
		value: "Shirt_A",
		type:"winter",
		url:"http://matchem.com/wp-content/uploads/2015/03/white-shirt.jpg"
	},
	{
		value: "Shirt_B",
		type:"summer", 
		url:"http://files.edock.it/eDockCore/eDockCorestreetstore//Images/2830%20--%20000%20(2853).jpg"
	},
	{
		value: "Shirt_C",
		type:"fall",
		url:"http://tennis-buzz.com/files/2012/03/polo-lacoste-drapeau-8.jpg"
	},
	];
	$scope.pants = [
	{
		value: "Pant_A",
		url: "https://s-media-cache-ak0.pinimg.com/236x/ff/92/de/ff92de49048468ab844e4a6073601013.jpg"
	},
	{
		value: "Pant_B",
		url: "http://statics.suitsupply.com/images/products/Trousers/medium/Trousers__B711_Suitsupply_Online_Store_1.jpg"
	},
	{
		value: "Pant_C",
		url: "http://www.oconnellsclothing.com/images/Z/bills-khakis-bullard-twi-18942z.jpg"
	},
	];
	$scope.shoes = [
	{
		value: "Shoes_A"
	},
	{
		value: "Shoes_B"
	},
	{
		value: "Shoes_C"
	},
	];
// $scope.randomOutfit = function() {
// 	$scope.shirtIndex = getRandomIndex(shirts.length)]
// 	$scope.pants = getRandomIndex(pants.length)
// 	$scope.shoes = shoes[getRandomIndex(pants.length)].value
// 	}
};