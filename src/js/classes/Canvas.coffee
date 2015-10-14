define [], () ->
	class Canvas 
		constructor: (@canvasId) ->
			@_canvas = document.getElementById(@canvasId)
		initCanvasWithImg: (img) ->
			@width = img.width
			@height = img.height
			@_ctx = @_canvas.getContext("2d")
			@_ctx.drawImage(img, 0, 0)
			@_pixels = @_canvas._ctx.getImageData(0, 0, img.width, img.height)
		loadImage: (img) ->	
			if (img instanceof Image)
				@.initCanvasWithImg(img)
			else
				img.onload = @initCanvasWithImg(img)
