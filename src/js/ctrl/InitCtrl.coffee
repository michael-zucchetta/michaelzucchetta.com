define ['premain', 'BasicInfoDao', 'animate-text'], (app) ->
	app.controller "InitCtrl", ['$scope', 'BasicInfoDao', ($scope, BasicInfoDao) ->
		$scope.myLinks = []

		BasicInfoDao.getLinks().then (links) ->
			$scope.myLinks = links.data
			return
		return
		]
	return
