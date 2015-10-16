define ['premain', 'FilesUtilities'], (app) ->

	app.factory 'ImagesUtilities', ['FilesUtilities', (FilesUtilities) ->
		factory = {}
		
		factory.loadImage = (file, callback) ->
			FilesUtilities.loadFile(file).then (resolvedFile) ->
				img = factory.createImage(resolvedFile.target.result)
				img.onload = callback(img)
				return

		factory.createImage = (hash) ->
			image = new Image()
			image.src = hash
			return image

		factory.floatOpacity = (opacity) ->
			opacity/255

		calculateVal = (val, opacity) ->
			(val*opacity)?.toString(16)

		factory.fromRgbToHex = (point) ->
			opacity = factory.floatOpacity(point.opacity)
			'#' + calculateVal(point.r, opacity) + calculateVal(point.g, opacity) + calculateVal(point.b, opacity)
		return factory
	]

	return
