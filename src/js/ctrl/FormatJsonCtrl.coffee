define ['premain', 'UtilitiesService', 'json-editor'], (app) ->
	app.controller "FormatJsonCtrl", ['$scope', 'UtilitiesService',
	($scope, UtilitiesService) ->
		
		$scope.unformatJson = () ->
			$scope.unformattedJson = JSON.stringify UtilitiesService.removeFormattationFromString($scope.unformattedJson)
			return
		

		return
		]
	return
