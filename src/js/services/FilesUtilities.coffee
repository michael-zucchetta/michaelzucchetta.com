define ['premain'], (app) ->
	app.factory 'FilesUtilities', ['$q', ($q) ->
		factory = {}
		
		factory.loadFile = (file) ->
			deferred = $q.defer()

			reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = (_file) ->
				deferred.resolve(_file)
				return
	
			return deferred.promise

		factory.fromImgToBase64 = (img) ->
			canvas = document.createElement("canvas")
			canvas.width = img.width
			canvas.height = canvas.height
			ctx = canvas.getContext("2d")
			ctx.drawImage(img, 0, 0)
			dataURL = canvas.toDataURL(image.type)
			dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
			return

		factory.initCanvasWithImg = (canvas, img) ->
			canvas.width = img.width
			canvas.height = img.height
			ctx = canvas.getContext "2d"
			ctx.drawImage(img, 0, 0)
			return

		return factory
	]
	return
