// json-editor is temporary. css attribute in directives is not working for directives bootstrapped later
define ['premain', 'BasicInfoDao', 'animate-text', 'dropdown-menu', 'json-editor'], (app) ->
	app.controller "InitCtrl", ['$scope', 'BasicInfoDao',
	($scope, BasicInfoDao) ->
		$scope.myLinks = []
		$scope.menu = []

		$scope.init = () ->
			BasicInfoDao.getLinks().then (links) ->
				$scope.myLinks = links
				return
			return
		return
		]
	return
