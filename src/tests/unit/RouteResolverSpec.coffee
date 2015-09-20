serviceName = 'RouteResolverService'
require [serviceName], () ->
	describe 'RouteResolverService test', () =>
		$injector = angular.injector [ 'RouteResolverServices' ]
		myService = $injector.get serviceName
		it 'Is it ok', () =>
			return
		return
	return
