define ['premain', 'angular', 'angularMocks', 'SampleCtrl'], (app) ->
	beforeEach module('common')
	$controller = null
	beforeEach inject (_$controller_) ->
		# The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_
		return

	describe 'describe', () ->
		it "it test",  () ->
				console.log 'test log'
				$scope = {}
				ctrl = $controller 'SampleCtrl', {$scope: $scope}
				console.log $scope.sum(2, 2)
				expect( $scope.sum(2,2) ).toBe 4
				return
		return
	return
