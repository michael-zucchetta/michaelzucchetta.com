define(['init/premain', 'angular', 'angularMocks'], function(app) {

	beforeEach(module('common'));

	var $controller;

	beforeEach(inject(function(_$controller_){
	// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('describe', function() {
		it("it test", function() {
			console.log('test log');
			expect(true).toBe(true);
		});
	});

});
