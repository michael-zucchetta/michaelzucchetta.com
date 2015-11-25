define ['lodash', 'jQuery'], () ->
	class TextEditor
		constructor: (@displayQuery, @textareaQuery, @containerQuery, @rowSuffix) ->
			#row suffix is the name of the single row class, such as cell
			#html elements
			## display is where the text is displayed
			## textarea is the textarea itself (not visible)
			## container is the container
			@display = $(@displayQuery)
			@textarea = $(@textareaQuery)
			@container = $(@containerQuery)

			@cellWidth = 8
			@cellHeight = 16
			@editorWidth = null
			@editorHeight = null
			@colsNumber = null
			@rowsNumber = null
			@statusMatrix = null
			@textValue = ""
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
			@statusMatrix = new Array(@rowsNumber)
			_self = this
			_.each @statusMatrix, (el, $index) ->
				#inside the each loop, the new object is an undefined variable and does not maintain the reference
				el = _self.statusMatrix[$index] = new Array(_self.colsNumber)
				el.isNew = true
				el.id = _self.rowSuffix + $index
				return
			return

		getCellString: (y) ->
			return @statusMatrix[y].string

		getCellLetter: (y, x) ->
			return @statusMatrix[y].string[x]

		clickEditor: ($event) ->
			# x/cellWidth I obtain the partial cell position, with round I get the cell number
			tmpX = $event.offsetX/@cellWidth
			@cellX = Math.round $event.offsetX/@cellWidth
			tmpY = ($event.target.offsetTop + $event.offsetY)/@cellHeight
			@cellY = Math.round(tmpY)
			y = @cellY*@cellHeight
			cellText = @getCellString(@cellY)
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

		insertChar: ($event) ->
			key = $event.keyCode || $event.charCode
			newChar = String.fromCharCode(key)
			#not del and not newline
			if (key isnt 8 and key isnt 46 and key isnt 13)
				@carelPos.left += @cellWidth
				if (@statusMatrix[@cellY].isNew)
					@textValue = @statusMatrix[@cellY].string = newChar
					@statusMatrix[@cellY].isNew = false
				else
					tmpString = @statusMatrix[@cellY].string
					@statusMatrix[@cellY].string = tmpString.substring(0, @cellX) + newChar + tmpString.substring(@cellX, tmpString.length)
					@textValue += newChar
				@cellX++
			if (key is 13)
				#key 13 is a newline
				@carelPos.left = 0
				@carelPos.top += @cellHeight
				@textarea.val('')
				@textValue = ""
				@cellY++
			return
	return TextEditor
