define ['premain', 'Canvas', 'ImagesUtilities'], (app, Canvas) ->
	app.controller "PickColorsCtrl", ['$scope', 'ImagesUtilities', ($scope, ImagesUtilities) ->

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
			console.log $event
			return

		return
	]
	return
