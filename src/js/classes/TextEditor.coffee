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
				el.string = ""
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
			key = getKeyFromEvent($event)
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
				@cellX = 0
				@cellY++
			return

		moveRows = () ->
			i = @cellY
			while i < @rowsNumber.length
				@statusMatrix[@cellY].string = @statusMatrix[@cellY + 1].string
			@statusMatrix[i].string = ""
			return

		deleteChar: ($event, key) ->
			#needed to capture the "delete key"
			cellText = @statusMatrix[@cellY].string
			#to be refactored
			if (key isnt 8 and key isnt 46)
				return
			#then it's a backspace case
			if (@statusMatrix[@cellY].string - 1) < 0
				@statusMatrix[@cellY].string = ""
				@statusMatrix[@cellY].isNew = true
				@cellY--
				@carelPos.top -= @cellHeight
				@cellX = @statusMatrix[@cellY].string.length
				@textValue = @statusMatrix[@cellY].string
				@carelPos.left = @cellWidth*@cellX
			else
				#concatenate two strings: one from zero to the cursor's position and then from the cursor's position to the end of the string
				@statusMatrix[@cellY].string = @textValue = cellText.substring(0, @cellX - 1) + cellText.substring(@cellX, cellText.length)
				
				@carelPos.left -= @cellWidth
				@cellX--
				if @cellX < 0
					#if it is going out of the screen
					@cellX = 0
				return
			return

		moveArrow: ($event, key) ->
			done = false
			deltaY = null
			deltaX = null
			switch key
				#left
				when 37 then deltaX = -1
				#up
				when 38 then deltaY = -1
				#right
				when 39 then deltaX = 1
				#down
				when 40 then deltaY = 1
				else return
			if (@cellX + deltaX) < 0
				deltaY = -1
			if (@cellX + deltaX) >= @statusMatrix[@cellY].string.length
				deltaY = 1
			else if (@cellX + deltaX) >= 0
				@cellX += deltaX
				@carelPos.left += @cellWidth*deltaX
				done = true
			if (@cellY + deltaY) >= 0 && !done
				@cellY += deltaY
				if (deltaY < 0)
					@cellX = @statusMatrix[@cellY].string.length
				else
					@cellX = 0
				@carelPos.left = @cellX*@cellWidth
				@carelPos.top = @cellY*@cellHeight
			return

		getKeyFromEvent = (event) ->
			key = event.keyCode || event.charCode
			return key

		handleKeyDown: ($event) ->
			key = getKeyFromEvent($event)
			if key in [37, 38, 39, 40]
				@moveArrow($event, key)
			else @deleteChar($event, key)
			return

	return TextEditor
