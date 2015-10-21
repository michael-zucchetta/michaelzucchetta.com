define ['premain', 'BasicInfoDao', 'animate-text', 'dropdown-menu'], (app) ->
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
