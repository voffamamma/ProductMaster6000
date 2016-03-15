"use strict";

angular.module("project3App").controller("SellerDlgController", ["$scope", "AppResource",
function SellerDlgController($scope, AppResource){

	$scope.seller = {
		name: "",
		category: "",
		imagePath: ""
	};

	$scope.onOk = function onOk(){
		$scope.$close($scope.seller);
	};

	$scope.onCancel = function onCancel() {
		$scope.$dismiss();
	};
}]);