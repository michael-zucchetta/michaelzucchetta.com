define ['premain', 'FilesUtilities'], (app) ->

	app.factory 'ImagesUtilities', ['FilesUtilities', (FilesUtilities) ->
		factory = {}
		
		factory.loadImage = (canvas, file) ->
			FilesUtilities.loadFile(file).then (resolvedFile) ->
				img = factory.createImage(resolvedFile.target.result)
				img.onload = FilesUtilities.initCanvasWithImg(canvas, img)


		factory.createImage = (hash) ->
			image = new Image()
			image.src = hash
			return image

		return factory
	]

	return
