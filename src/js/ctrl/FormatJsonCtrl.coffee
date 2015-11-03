define ['premain', 'UtilitiesService'], (app) ->
	app.controller "FormatJsonCtrl", ['$scope', 'UtilitiesService',
	($scope, UtilitiesService) ->
		
		$scope.unformatJson = () ->
			$scope.unformattedJson = JSON.stringify UtilitiesService.removeFormattationFromString($scope.unformattedJson)
			return
		
		$scope.initFormatJson = () ->
			#To be moved to a directive
			height = 304
			lineHeight = 16
			$('.json-input-container').click ($event) ->
				x = $event.offsetX
				y = $event.offsetY
				$('#json-input').css({
					left: x,
					top: y
				})
				return
			return
		$(document).ready () ->
			$scope.initFormatJson()
			return

		return
		]
	return
