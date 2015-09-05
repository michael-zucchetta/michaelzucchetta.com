define(['premain', 'angular', 'angularMocks', 'SampleCtrl'], function(app) {

	beforeEach(module('common'));

	var $controller;

	beforeEach(inject(function(_$controller_){
	// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('describe', function() {
		it("it test", function() {
			console.log('test log');
			var $scope = {};
			var ctrl = $controller('SampleCtrl', { $scope: $scope });
			console.log($scope.sum(2,2));
			expect($scope.sum(2,2)).toBe(4);
		});
	});

});
