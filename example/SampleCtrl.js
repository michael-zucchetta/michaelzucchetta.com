define(['premain'], function(app) {

	app.controller('SimpleCtrl', [
		'$scope',
		function($scope) {
			$scope.sum = function(n1, n2) {
				if (n1 == undefined || n2 == undefined) {
					return "Error";
				}
				return n1 + n2;
			};
		}
	);

});
