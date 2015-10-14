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

		return factory
	]

	return
