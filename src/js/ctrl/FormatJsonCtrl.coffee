define ['premain', 'UtilitiesService'], (app) ->
	app.controller "FormatJsonCtrl", ['$scope', 'UtilitiesService',
	($scope, UtilitiesService) ->
		
		$scope.unformatJson = () ->
			$scope.unformattedJson = JSON.stringify UtilitiesService.removeFormattationFromString($scope.unformattedJson)
			return
		
		$scope.initFormatJson = () ->
			#To be moved to a directive and refactored
			height = 304
			cellHeight = 16
			cellWidth = 8
			width = $('#json-input-display').outerWidth()
			cellNumber = width/cellWidth
			$('.json-input-container').click ($event) ->
				# x/cellWidth I obtain the partial cell position, with round I get the cell number 
				x = Math.ceil($event.offsetX/cellWidth + 1)*cellWidth
				y = Math.round($event.offsetY/cellHeight)*cellHeight
				$('#json-input').css({
					left: x,
					top: y
				})
				$('#json-input').focus()
				return
			return
		$(document).ready () ->
			$scope.initFormatJson()
			return

		return
		]
	return
