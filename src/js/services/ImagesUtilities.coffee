define ['premain', 'FilesUtilities'], (app) ->

	app.factory 'ImagesUtilities', ['FilesUtilities', '$q', '$interval', (FilesUtilities, $q, $interval) ->
		factory = {}
		
		factory.loadImage = (file, callback) ->
			FilesUtilities.loadFile(file).then (resolvedFile) ->
				img = factory.createImage(resolvedFile.target.result)
				factory.onCompleteImg(img).then () ->
					callback(img)
				return
		
		factory.onCompleteImg = (img) ->
			deferred = $q.defer()
			cancelInterval = $interval () ->
				if img.complete
					$interval.cancel cancelInterval
					deferred.resolve(true)
			, 30
			return deferred.promise

		factory.createImage = (hash) ->
			image = new Image()
			image.src = hash
			return image

		factory.floatOpacity = (opacity) ->
			opacity/255

		calculateVal = (val, opacity) ->
			hexVal = (val*opacity).toString(16) if (val*opacity)
			hexVal = switch
				when hexVal is undefined then '00'
				when hexVal.length is 1 then '0' + hexVal
				else hexVal
			return hexVal

		factory.fromRgbToHex = (point) ->
			opacity = factory.floatOpacity(point.opacity)
			'#' + calculateVal(point.r, opacity) + calculateVal(point.g, opacity) + calculateVal(point.b, opacity)
		return factory
	]

	return
