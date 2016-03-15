"use strict";

angular.module("project3App").controller("SellersController", ["$scope", "AppResource", "SellerDlg",
function SellersController($scope, AppResource, SellerDlg, centrisNotify) 
{

	// TODO: load data from AppResource! Also, add other methods, such as to
	// add/update sellers etc.


	AppResource.getSellers().success(function(sellers)
	{
		$scope.sellers = sellers;

	});

	
	$scope.onAddSeller = function onAddSeller() 
	{
		SellerDlg.show().then(function(seller)
		{
			AppResource.addSeller(seller).success(function(seller)
			{
				console.log("Sko");
				var newSeller = seller;
				
			}).error(function() 
			{
			//	centrisNotify.error(sellers.Message.SaveFailed);
			//TODO
			});
			
		});	
	}; 
}]);