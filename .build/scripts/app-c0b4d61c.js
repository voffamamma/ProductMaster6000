"use strict";

angular.module("project3App", ["ngRoute", "ui.bootstrap", "sharedServices"])
.config(["$routeProvider", function ($routeProvider) {

	$routeProvider
	.when("/home", {
		templateUrl: "components/sellers/index.html",
		controller: "SellersController"
	})
	.when("/seller/:sid", {
		templateUrl: "components/seller-details/sellersdetails.html",
		controller: "SellersDetailsController"
	})
	.otherwise({
		redirectTo: "/home"
	});
/*
	$translateProvider.useStaticFilesLoader({
		prefix: "lang_",
		suffix: ".json"
	}).preferredLanguage("is");
	$translateProvider.useLocalStorage();
	$translateProvider.useSanitizeValueStrategy('escape');*/
}]);

"use strict";

angular.module("sharedServices", ["toastr"]);
"use strict";

/**
 * This module serves as the main resource object for our app, i.e.
 * the object which connects to our REST backend and loads/saves data.
 */
angular.module("project3App").factory("AppResource",
function AppResource() {

	// A helper function to create a seller object.
	// Note that this is only a helper to generate
	// mock data, and is not a part of our business logic!
	function createSeller(id, name, category, img) {
		return {
			id: id,
			name: name,
			category: category,
			imagePath: img
		};
	}

	// Another helper function.
	function createProduct(sellerid, id, productName, price, quantitySold, quantityInStock, path) {
		return {
			id: sellerid,
			product: {
				id: id,
				name: productName,
				price: price,
				quantitySold: quantitySold,
				quantityInStock: quantityInStock,
				imagePath: path
			}
		};
	}

	// Out mock data. Note that this is just to help us
	// during development!
	var mockSellers = [
		createSeller(1, "Hannyrðaþjónusta Hannesar", "Fatnaður", "http://i.imgur.com/OYVpe2W.jpg?fb"),
		createSeller(2, "Smíðaverkstæði Sigríðar", "Skartgripir", "https://i.imgur.com/ywaPivVh.jpg"),
		createSeller(3, "Sælgætisgerð Sjonna og Súsí", "Matvörur", "http://i.imgur.com/IuL474x.jpg"),
		createSeller(4, "Leirkeraverkstæði Lomma", "Keramik", "https://upload.wikimedia.org/wikipedia/commons/6/67/Potter_at_work,_Jaura,_India.jpg")
	];

	var nextID = 5;

	var mockProducts = [
		createProduct(1,  1, "Ullarvettlingar",  1899, 500, 12, "http://i.imgur.com/MZOmRnH.jpg"),
		createProduct(1,  2, "Ullarsokkar",      2199, 488,  9, "http://i.imgur.com/0XKznD4.jpg?1"),
		createProduct(1,  3, "Trefill",           999, 600, 23, "http://i.imgur.com/50ivFlC.jpg"),
		createProduct(1,  4, "Sjal",             2399, 120, 65, "https://farm6.static.flickr.com/5205/5298302908_fb75ed8e0a.jpg"),
		createProduct(1,  5, "Húfa",             1799, 700, 11, "http://purnahandmade.com/media/catalog/product/cache/1/image/ab49223884317513dca074f3bc642368/p/h/phc_malle_08_orwh.jpg"),
		createProduct(1,  6, "Bjórvettlingar",   2649,  12, 99, "https://img1.etsystatic.com/050/1/5847299/il_214x170.730058347_mt4x.jpg"),
		createProduct(1,  7, "Jakki",            4499,  23, 14, "http://www.newmanmayahandicraft.com.np/wp-content/uploads/2015/10/woolen-jacket-with-multicolored-design.jpg"),
		createProduct(1,  8, "Peysa",            5899, 122,  1, "https://upload.wikimedia.org/wikipedia/commons/7/75/Selburose-sweater.jpg"),
		createProduct(1,  9, "Lambhúshetta",     2499, 322,  4, "https://upload.wikimedia.org/wikipedia/commons/9/9a/Balaclava_3_hole_black.jpg"),
		createProduct(1, 10, "Buxur",            4299,  73,  5, ""),
		createProduct(1, 11, "Grifflur",         1299,  98,  9, ""),
		createProduct(1, 12, "Teppi",             499, 819, 98, "https://pixabay.com/static/uploads/photo/2015/11/07/14/40/fabric-1031932_960_720.jpg"),
		createProduct(1, 13, "Sokkar",            499, 991, 23, "https://upload.wikimedia.org/wikipedia/commons/4/42/HandKnittedWhiteLaceSock.jpg"),
		createProduct(1, 14, "Bindi",             899,  25, 22, ""),
		createProduct(1, 15, "Slaufa",            499, 552, 54, "https://pixabay.com/static/uploads/photo/2015/04/20/21/39/bow-tie-732289_960_720.jpg"),
		createProduct(1, 16, "Hnéháir sokkar",   2499,  93, 42, "https://upload.wikimedia.org/wikipedia/commons/c/cf/Argyle_(PSF).png"),
		createProduct(1, 17, "Barnatrefill",      999,  39, 11, "https://upload.wikimedia.org/wikipedia/commons/a/a4/Well-clothed_baby.jpg"),
		createProduct(1, 18, "Hneppt peysa",     4499,  19,  9, "https://upload.wikimedia.org/wikipedia/commons/4/4d/1940_Trachtenstrickjacke_anagoria.JPG"),
		createProduct(1, 19, "Hvítir vettlingar", 499, 241,  0, "https://pixabay.com/static/uploads/photo/2014/05/05/22/15/gloves-338614_960_720.jpg"),
		createProduct(1, 20, "Úlnliðshlífar",    1499,  34,  0, "https://pixabay.com/static/uploads/photo/2015/11/07/17/20/hands-1032312_960_720.jpg"),
		createProduct(3, 21, "Kókoskúlur",        499, 100, 5000, "https://upload.wikimedia.org/wikipedia/commons/2/2c/Chokladbollar.jpg"),
		createProduct(3, 22, "Brjóstsykur",       499, 200, 4900, ""),
	];
	// Note: sellers 2 and 4 don't have any products - yet!

	// A helper object which emulates the return value
	// from the $http service in Angular.
	var mockHttpPromise = function(condition, data) {
		return {
			success: function(fn) {
				if (condition) {
					fn(data);
				}
				return {
					error: function f() {
						if (!condition) {
							f();
						}
					}
				};
			}
		};
	};

	var mockResource = {
		// Note: the following properties should NOT be used
		// in production code, but can be used in unit testing
		// code to tell this resource to behave in a certain way!
		successLoadSellers:         true,
		successAddSeller:           true,
		successUpdateSeller:        true,
		successLoadSellerDetails:   true,
		successGetSellerProducts:   true,
		successAddSellerProduct:    true,
		successUpdateSellerProduct: true,

		// Below are the real functions this object should support.
		// The current implementation is of course just a mock
		// implementation, which returns the hardcoded data
		// defined above. A proper implementation will talk to
		// an API to load/save data.
		getSellers: function getSellers() {
			return mockHttpPromise(mockResource.successLoadSellers, mockSellers);
		},

		addSeller: function addSeller(seller) {
			if (mockResource.successAddSeller) {
				// TODO : setja id
				console.log("blabla" + " " + seller);
				seller.id = nextID++;

				mockSellers.push(seller);
			}
			return mockHttpPromise(mockResource.successAddSeller, seller);
		},

		updateSeller: function(id, seller) {
			if (mockResource.successUpdateSeller) {
				var current = _.find(mockSellers, function(o){ return o.id === id;});
				if (current !== null) {
					current.name      = seller.name;
					current.category  = seller.category;
					current.imagePath = seller.imagePath;
				}
			}
			return mockHttpPromise(mockResource.successUpdateSeller, seller);
		},

		getSellerDetails: function(id) {
			var seller;
			for (var i = 0; i < mockSellers.length; ++i) {
				if (mockSellers[i].id === id) {
					seller = mockSellers[i];
					break;
				}
			}

			if (seller) {
				return mockHttpPromise(mockResource.successLoadSellerDetails, seller);
			} else {
				return mockHttpPromise(false, null);
			}
		},

		getSellerProducts: function getSellerProducts(id) {
			var products = [];
			for (var i = 0; i < mockProducts.length; ++i) {
				if (mockProducts[i].id === id) {
					products.push(mockProducts[i].product);
				}
			}

			return mockHttpPromise(mockResource.successGetSellerProducts, products);
		},

		addSellerProduct: function addSellerProduct(id, product) {
			var success = false;
			if (mockResource.successAddSellerProduct) {
				var seller = _.find(mockSellers, function(o){ return o.id === id;});
				if (seller) {
					success = true;
					mockProducts.push({
						id: seller.id,
						product: product
					});
				}
			}

			return mockHttpPromise(success, product);
		}

		// TODO: the updateProduct() function is left as an exercise to
		// the reader...
	};

	return mockResource;
});
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
"use strict";

/**
 * @ngdoc service
 * @name general.centrisNotify
 * @description
 * A common notification service. Usage:
 *
 * a) inject centrisNotify into your controller/factory/whatever
 * b) at the appropriate time, call one of the following methods:
 *
 * ```js
 *    centrisNotify.success("app.LanguageFileKey");
 *    centrisNotify.error("app.LanguageFileKey");
 *    centrisNotify.successWithParam("app.LanguageKey", someValue);
 *    centrisNotify.errorWithParam("app.LanguageKey", someValue);
 *    centrisNotify.successWithUndo("app.LanguageKey", undoID); // Displays a "Undo" button
 * ```
 *
 *    The first two methods accept an optional second parameter which
 *    is the title of the notification. However, it is preferred
 *    to specify the title in language files under the key "NotificationTitle".
 *    The next two methods will take a string which is a key into a language
 *    file, plus some variable, and inject the value of the variable into
 *    the string. It is assumed that the placeholder inside the string is
 *    on the format {{value}}
 *    The final version - successWithUndo - accepts a single language key
 *    string, as well as another value. This function will display an "undo"
 *    button, and this second parameter will be passed to that function. That
 *    parameter should contain two properties:
 *    * "type" - a string with the type of object being operated on
 *    * "id" - a value (simple or comples) which identifies the object being operated on
 *
 */
angular.module("sharedServices").factory("centrisNotify",
function(toastr, toastrConfig, $translate, $rootScope) {
	var durationMSec = 10000;
	var defaultTitle = "Centris";

	// Is this the correct place for this? Perhaps not. But we
	// want the code to be DRY, and we don't want to
	// repeat this. I.e. there is a support for undo in our
	// custom template (that is the purpose of it!), and
	// there must be a common event handler for the undo.
	// This is as good place as any other (probably better),
	// but if a better place will be found, please move this function!
	$rootScope.centrisUndo = function centrisUndo(type, id) {
		$rootScope.$broadcast("centrisUndo", {type: type, id: id});
	};

	// Load the title to the notification from language files.
	// Since the factory will probably be created at startup,
	// the language files may or may not be properly loaded.
	// Therefore, we use the promise version.
	$translate("NotificationTitle").then(function(value) {
		defaultTitle = value;
	});

	function displayMessage(type, message, title) {
		var options = {
			timeOut: durationMSec
		};

		// In case the previous toast was an undo toast,
		// which overrode the template path:
		toastrConfig.templates.toast = "components/centris-notify/centris-notify.tpl.html";

		if (type === "success") {
			toastr.success(message, title, options);
		} else if (type === "error") {
			toastr.error(message, title, options);
		}
	}

	// Declare the function which takes care of the actual notification:
	var notificationFunction = function notificationFunction(type, titleKey, messageKey) {
		var message = $translate.instant(messageKey);
		var title   = defaultTitle;

		if (titleKey !== undefined) {
			title = $translate.instant(titleKey);
		}

		displayMessage(type, message, title);
	};

	var displayMessageWithUndo = function displayMessageWithUndo(message, undoID) {
		var options = {
			timeOut: durationMSec
		};

		// Slight hack, but hopefully the library will be able to
		// officcially support per-toast templates in later versions
		toastrConfig.templates.toast = "components/centris-notify/centris-notify-undo.tpl.html";

		// HACK! Because toastr doesn't allow us to pass in
		// any "Item Data" (see MFC CListCtrl), we need to
		// "sneak" the undoID in somehow differently. Since
		// our custom template hardcodes the title, we
		// don't need to use that parameter, and can pass the
		// undoID in there instead!
		toastr.success(undoID, message, options);
		// Oh and this is also very hackish, we need to switch
		// the title and the message because of some logic
		// in the library (sigh)
	};

	var notificationFunctionWithParam = function notificationFunctionWithParam(type, messageKey, param) {
		$translate(messageKey, { value: param }).then( function(msg) {
			displayMessage(type, msg, defaultTitle);
		});
	};

	var notificationFunctionWithUndo = function notificationFunctionWithUndo(messageKey, undoID) {
		$translate(messageKey).then(function(msg) {
			displayMessageWithUndo(msg, undoID);
		});
	};

	return {
		success: function success(messageKey, titleKey) {
			notificationFunction("success", titleKey, messageKey);
		},
		error: function error(messageKey, titleKey) {
			notificationFunction("error", titleKey, messageKey);
		},
		successWithParam: function successWithParam(messageKey, param) {
			notificationFunctionWithParam("success", messageKey, param);
		},
		errorWithParam: function errorWithParam(messageKey, param) {
			notificationFunctionWithParam("error", messageKey, param);
		},

		// This function only comes in the "success" variation, since
		// we hardly need undo support for messages which only
		// display error messages, do we?
		successWithUndo: function successWithUndo(messageKey, undoID) {
			notificationFunctionWithUndo(messageKey, undoID);
		}
	};
});
"use strict";

/**
 * @ngdoc object
 * @name general.tableSort
 * @description
 * Use this directive to sort columns in a table. To use it you add
 * the directive to the table row <tr>, then you have to add data-columnName
 * to each <th> which should be sortable. The directive can take a string
 * parameter which will be used as the default column to be sorted.
 *
 * Note that this directive is currently a bit brutal, i.e. it will remove
 * ALL css classes from the table headings when a column is no longer the default
 * sort column (this may have to change later).
 *
 * Dependencies:
 *
 * * Depends on Font Awesome for the caret icon.
 *
 * @example
 * ```html
 * <!-- a) For each column that should be sortable, add the data-columnName attribute,
 * with the value of the sort expression: -->
 *
 * <tr table-sort="Name">
 *     <th data-columnName="Name">Name</th>
 *     <!-- etc. for each column in the table -->;
 * </tr>
 *
 * <!-- b) in your ng-repeat for the table rows, ensure you are using orderBy filter
 * with predicate and reverse (which are scope variables created by this
 * directive): -->
 *
 * <tr ng-repeat="stuff in stuffz | orderBy:predicate:reverse">
 *
 * <!-- If the sort order should be reversed initially, place a minus sign in front of
 *      the name of the default column: -->
 * <tr table-sort="-Name">
 * ```
 */
angular.module("sharedServices").directive("tableSort", function () {
	function link(scope, element, attrs) {
		var tableChildren = element.children();
		var defaultColumn = attrs.tableSort;
		var reverse = attrs["reverse"] || "reverse";
		var predicate = attrs["predicate"] || "predicate";

		if (defaultColumn.length > 0 && defaultColumn[0] === "-") {
			scope[reverse] = true;
			scope[predicate] = defaultColumn.substring(1);
		} else {
			scope[reverse] = false;
			scope[predicate] = defaultColumn;
		}

		function initClickHandlers() {
			angular.forEach(tableChildren, function(value) {
				var el = angular.element(value);
				var columnName = el.attr("columnName") || el.attr("data-columnName");

				// Only attach a click handler if:
				// a) the <th> element has a non-empty data-columnName attribute.
				// b) there isn't already a click handler there
				if (isSortColumn(columnName)) {
					if (el.attr("ng-click") === undefined) {
						el.bind("click", function(e) {
							scope.$apply(function() {
								sortNotes(columnName);
							});
						});
					}
				}
			});
		}
		initClickHandlers();

		// In case the number of columns is variable (or generated using
		// a ng-repeat), we need to watch for new columns.
		// TODO: doesn't quite work yet!
		/*
		scope.$watch(element.children().length, function(){
			console.log("Length of elements has changed!");
			initClickHandlers();
		});
		*/
		// Setup the columns adding <i> to all table headers and
		// adds caret class to the default column.
		function setup() {
			angular.forEach(tableChildren, function(value) {
				var el = angular.element(value);
				var columnName = el.attr("columnName") || el.attr("data-columnName");
				if (isSortColumn(columnName)) {
					el.prepend("<i></i>");
					if (columnName === defaultColumn || columnName === "'" + defaultColumn + "'") {
						el.children().addClass("fa fa-caret-" + (scope[reverse] ? "up" : "down"));
					}
				}
			});
		}

		function isSortColumn(columnName) {
			return columnName !== undefined && columnName.length > 0;
		}

		function sortNotes(sortBy) {
			if (scope[predicate] === sortBy) {
				scope[reverse] = !scope[reverse];
			}
			scope[predicate] = sortBy;
			angular.forEach(tableChildren, function(value) {
				var el = angular.element(value);
				var columnName = el.attr("columnName") || el.attr("data-columnName");
				if (isSortColumn(columnName)) {
					el.children().removeClass();
					if (scope[predicate] === columnName) {
						el.children().addClass("fa fa-caret-" + (sortDown(sortBy) ? "up" : "down"));
					}
				}
			});
		}

		// Helper function:
		function sortDown(sortType) {
			return scope[reverse] && scope[predicate] === sortType;
		}

		scope.$watch("tableSort", function(value) {
			if (value) {
				defaultColumn = value;
			}
			setup();
		});
	}

	return {
		restrict: "A",
		replace: false,
		link: link
	};
});
