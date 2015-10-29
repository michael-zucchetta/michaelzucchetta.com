define ['premain', 'Canvas', 'ImagesUtilities'], (app, Canvas) ->
	app.controller "PickColorsCtrl", ['$scope', '$timeout', 'ImagesUtilities', ($scope, $timeout, ImagesUtilities) ->


		$scope.initPickColors = () ->
			$scope.canvas = null
			$scope.loadPicLabel = "Load picture:"
			$scope.backupCanvases = []
			return

		$scope.createCanvasBackup = () ->
			canvasBackup = document.createElement("canvas")
			canvasBackup.width = $scope.canvas.width
			canvasBackup.height = $scope.canvas.height
			ctx = canvasBackup.getContext "2d"
			ctx.drawImage $scope.canvas.getCanvas(), 0, 0
			$scope.backupCanvases.push canvasBackup
			return

		$scope.uploadPicture = () ->
			return if !$scope.imageFile
			file = $scope.imageFile
			$scope.canvas = new Canvas('uploaded-picture')
			ImagesUtilities.loadImage file, (img) ->
				$scope.canvas.loadImage(img)
				return
			return
		
		$scope.clickCanvas = ($event) ->
			$scope.pixelValue = $scope.canvas.getPixelValue($event.offsetY, $event.offsetX)
			$scope.pixelHexValue = ImagesUtilities.fromRgbToHex($scope.pixelValue)
			$timeout () ->
				document.getElementById('result-color').value = $scope.pixelHexValue
				return
			return

		$scope.zoomCanvas = ($event) ->
			#To be changed so it is enabled on body and check if the event is within the canvas
			if $event.keyCode is 122
				$scope.createCanvasBackup()
				$scope.canvas.zoomCanvas()
			else if $event.shiftKey and $event.keyCode is 90 and $scope.backupCanvases.length
				$scope.canvas.setScale($scope.canvas.getScale() / 2)
				$scope.canvas.drawCanvas $scope.backupCanvases.pop()
			return

		$scope.initPickColors()

		return
	]
	return
