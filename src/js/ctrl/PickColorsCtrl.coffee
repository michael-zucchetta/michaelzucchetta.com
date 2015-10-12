define ['premain'], (app) ->
	app.controller "PickColorsCtrl", ['$scope', ($scope) =>

		$scope.uploadPicture = ($files) ->
			console.log $files
			
			return
		
		$scope.loadPicLabel = "Load picture:"

		return
	]
	return
