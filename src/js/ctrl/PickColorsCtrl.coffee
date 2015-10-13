define ['premain', 'ImagesUtilities'], (app) ->
	app.controller "PickColorsCtrl", ['$scope', 'ImagesUtilities', ($scope, ImagesUtilities) ->

		$scope.uploadPicture = ($files) ->
			return if !$files
			file = $files[0]
			canvas = $('#uploaded-picture')[0]
			ImagesUtilities.loadImage(canvas, file)
			return
		
		$scope.loadPicLabel = "Load picture:"

		return
	]
	return
