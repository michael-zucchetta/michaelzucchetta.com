define ['lodash', 'jQuery'], () ->
	class TextEditor
		constructor: (@displayQuery, @textareaQuery, @containerQuery, @rowSuffix) ->
			#html elements
			@display = $(@displayQuery)
			@textarea = $(@textareaQuery)
			@container = $(@containerQuery)
			
			@cellWidth = 8
			@cellHeight = 16
			@editorWidth = null
			@editorHeight = null
			@colsNumber = null
			@rowsNumber = null
			@editorStatusMatrix = null
			@cellX = 0
			@cellY = 0
			@carelPos =
				left: 0
				top: 0
			return
		initEditor: () ->
			@editorWidth = @display.outerWidth()
			@editorHeight = @display.outerHeight()
			@colsNumber = Math.round @editorWidth/@cellWidth
			@rowsNumber = Math.round @editorHeight/@cellHeight
			@editorStatusMatrix = new Array(@rowsNumber)
			_self = this
			_.each @editorStatusMatrix, (el, $index) ->
				#inside the each loop, the new object is an undefined variable and does not maintain the reference
				el = _self.editorStatusMatrix[$index] = new Array(_self.colsNumber)
				el.isNew = true
				el.id = _self.rowSuffix + $index
				return
			return

		clickEditor: ($event) ->
			# x/cellWidth I obtain the partial cell position, with round I get the cell number
			tmpX = $event.offsetX/@cellWidth
			#tmpX = (tmpX + 1) is cellNumber? tmpX : tmpX + 1
			@cellX = Math.round $event.offsetX/@cellWidth
			tmpY = ($event.target.offsetTop + $event.offsetY)/@cellHeight
			#tmpY = if tmpY > 1 then tmpY - 1 else tmpY
			@cellY = Math.round(tmpY)
			y = cellY*@cellHeight
			cellText = scope.editorStatusMatrix[cellY].string
			if cellText
				if cellText.length < @cellX
					@cellX = cellText.length
				@textarea.val cellText
			else @cellX = 0
			x = @cellX*@cellWidth
			@carelPos.left = x
			@carelPos.top = y
			@textarea.focus()
			return
	return TextEditor
