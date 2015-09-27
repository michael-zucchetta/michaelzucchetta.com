define ['premain', 'BasicInfoDao', 'animate-text', 'UtilitiesService'], (app) ->
	app.controller "InitCtrl", ['$scope', 'BasicInfoDao', 'UtilitiesService', ($scope, BasicInfoDao, UtilitiesService) ->
		$scope.myLinks = []
		$scope.menu = []

		$scope.init = () ->
			BasicInfoDao.getLinks().then (links) ->
				$scope.myLinks = links.data
				return
			BasicInfoDao.getMenu().then (menu) ->
				$scope.menu = UtilitiesService.initializeMenu menu.data
				return
			return
		return
		]
	return
