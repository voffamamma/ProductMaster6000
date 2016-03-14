"use strict";

angular.module("project3App").factory("SellerDlg",
function SellerDlg($uibModal) {
		return {
			show: function() {
				var modalInstance = $uibModal.open({
					templateUrl: "components/seller-dlg",
					controller: "SellerDlgController"
				});

				return modalInstance.restult;
			}
		};
});