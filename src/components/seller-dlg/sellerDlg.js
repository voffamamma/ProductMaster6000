"use strict";

angular.module("project3App").factory("SellerDlg",
function SellerDlg($uibModal){
	return {
		show: function() {
			var modalInstance = $uibModal.open({
				templateUrl: "components/seller-dlg/seller-dlg.html",
				controller: "SellerDlgController"
			});
			return modalInstance.result;
		},
		showEdit: function(id) {
			var modalInstance = $uibModal.open({
				templateUrl: "components/seller-dlg/seller-dlg.html",
				controller: "SellerEditDlgController",
				resolve: {
					id: function() {
						return id;
					}
				}
			});
			return modalInstance.result;
		}
	};
});