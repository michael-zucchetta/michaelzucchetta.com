define ['premain', 'Canvas', 'ImagesUtilities'], (app, Canvas) ->
	app.controller "PickColorsCtrl", ['$scope', '$timeout', 'ImagesUtilities', ($scope, $timeout, ImagesUtilities) ->

		canvas = null

		$scope.uploadPicture = ($files) ->
			return if !$files
			file = $files[0]
			canvas = new Canvas('uploaded-picture')
			ImagesUtilities.loadImage file, (img) ->
				canvas.loadImage(img)
				return
			return
		
		$scope.loadPicLabel = "Load picture:"

		$scope.clickCanvas = ($event) ->
			$scope.pixelValue = canvas.getPixelValue($event.offsetY, $event.offsetX)
			$scope.pixelHexValue = ImagesUtilities.fromRgbToHex($scope.pixelValue)
			$timeout () ->
				document.getElementById('result-color').value = $scope.pixelHexValue
				return
			return

		return
	]
	return
