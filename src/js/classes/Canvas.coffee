define [], () ->
	class Canvas
		constructor: (@canvasId) ->
			@_canvas = document.getElementById(@canvasId)
			@_scale = 1
			@_ctx = @_canvas.getContext "2d"
			_self = this
			@resizeCanvas = () ->
				#to be removed, it should not stay here
				siblingsHeight = 0
				canvasParent = _self._canvas.parentNode
				siblingsEls = $(_self._canvas).siblings()
				for el in siblingsEls
					siblingsHeight += el.clientHeight
				#To be checked
				_self.width =  _self._canvas.width = canvasParent.clientWidth
				_self.height = _self._canvas.height = canvasParent.clientHeight - siblingsHeight - 50
				if _self._scale is 1 and (_self._img.width > _self.width or _self._img.height > _self.height)
					# first resize, so first interaction
					scaleX = _self.width/_self._img.width
					scaleY = _self.height/_self._img.height
					_self._scale = Math.min scaleX, scaleY
				_self.drawImage()
				return
			window.addEventListener 'resize', @resizeCanvas, false
			document.addEventListener 'mousemove', (event) ->
				_self._mouseX = event.pageX - $(_self._canvas).offset().left
				_self._mouseY = event.pageY - $(_self._canvas).offset().top
				return
		pixInterval = 4
		initCanvasWithImg: (img) ->
			@_img = img
			@width = @_img.width
			@height = @_img.height
			@_canvas.width = @width
			@_canvas.height = @height
			@resizeCanvas()
			return
		loadImage: (img) ->
			if (img instanceof Image)
				@initCanvasWithImg(img)
			else
				img.onload = @initCanvasWithImg(img)

			return
		drawImage: (action) ->
			@_ctx.clearRect(0, 0, @width*@_scale, @height*@_scale)
			@_ctx.save()
			action?()
			@_ctx.scale(@_scale, @_scale)
			@_ctx.drawImage(@_img, 0, 0)
			@_pixels = @_ctx.getImageData(0, 0, @width*@_scale, @height*@_scale)
			@_ctx.restore()
			return
		getPixelValue: (y, x) ->
			offset = y*pixInterval*@_pixels.width + x*pixInterval
			return {
				r: @_pixels.data[offset + 0]
				g: @_pixels.data[offset + 1]
				b: @_pixels.data[offset + 2]
				opacity: @_pixels.data[offset + 3]
			}
		#zoom by a factor of 2 and use a cursor as center of the zoomed canvas
		zoomCanvas: () ->
			_self = this
			@drawImage () ->
				newY = _self._mouseY - _self.height/4
				newX = _self._mouseX - _self.width/4
				_self._scale *= 2
				_self._ctx.translate(-newX, -newY)
				return
			return
	return Canvas
