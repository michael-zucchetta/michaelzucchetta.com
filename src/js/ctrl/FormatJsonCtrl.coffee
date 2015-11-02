define ['premain'], (app) ->
	app.controller "FormatJsonCtrl", ['$scope',
	($scope) ->
		
		$scope.unformatJson = () ->
			$scope.unformattedJson = JSON.stringify $scope.unformattedJson
			return

		return
		]
	return
