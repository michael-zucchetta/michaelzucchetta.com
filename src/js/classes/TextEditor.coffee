define ['lodash', 'jQuery'], () ->
	leftKey = 37
	upKey = 38
	rightKey = 39
	downKey = 40

	delKey1 = 8
	delKey2 = 46

	tabKey = 9

	charA = 65

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

		getLastRowIndex: () ->
			$index = null
			_.each @statusMatrix, (row, index) ->
				if row.isNew and $index == null
					$index = index
				return
			return $index

		clickEditor: ($event) ->
			# x/cellWidth I obtain the partial cell position, with round I get the cell number
			tmpX = $event.offsetX/@cellWidth
			console.log("click", $event)
			@cellX = Math.round $event.offsetX/@cellWidth
			tmpY = ($event.target.offsetTop + $event.offsetY)/@cellHeight
			@cellY = Math.round(tmpY)
			cellText = @getCellString(@cellY)
			if cellText
				if cellText.length < @cellX
					@cellX = cellText.length
				@textarea.val cellText
			else @cellX = 0
			if @cellY > @getLastRowIndex()
				@cellY = @getLastRowIndex()
			
			y = @cellY*@cellHeight
			x = @cellX*@cellWidth
			@carelPos.left = x
			@carelPos.top = y
			@textarea.focus()
			return

		doubleClickEditor: ($event) ->
			#select word
			console.log("double click", $event)
			return

		insertChar: ($event) ->
			key = getKeyFromEvent($event)
			newChar = String.fromCharCode(key)
			#not del and not newline, to be put on constants
			if (key isnt 8 and key isnt 46 and key isnt 13 and key isnt 10)
				@carelPos.left += @cellWidth
				if (@statusMatrix[@cellY].isNew)
					@textValue = @statusMatrix[@cellY].string = newChar
					@statusMatrix[@cellY].isNew = false
				else
					tmpString = @statusMatrix[@cellY].string
					@statusMatrix[@cellY].string = tmpString.substring(0, @cellX) + newChar + tmpString.substring(@cellX, tmpString.length)
					@textValue += newChar
				@cellX++
			if (key is 13 or key is 10)
				#if key 13 and 10 -> key is a newline
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
				#if it is the first char of a line
				@statusMatrix[@cellY].string = ""
				@statusMatrix[@cellY].isNew = true
				if @cellY isnt 0
					#if not the first char of the first line
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
				when leftKey then deltaX = -1
				#up
				when upKey then deltaY = -1
				#right
				when rightKey then deltaX = 1
				#down
				when downKey then deltaY = 1
				else return
			if (@cellX + deltaX) < 0
				deltaY = -1
			if (@cellX + deltaX) >= @statusMatrix[@cellY].string.length and key isnt upKey
				deltaY = 1
			else if deltaX and (@cellX + deltaX) >= 0
				@cellX += deltaX
				@carelPos.left += @cellWidth*deltaX
				done = true
			if (@cellY + deltaY) >= 0 && !done
				@cellY += deltaY
				if (deltaY < 0)
					if key isnt upKey or @cellX > @statusMatrix[@cellY].string.length
						@cellX = @statusMatrix[@cellY].string.length
				else
					if @statusMatrix[@cellY - deltaY].isNew
						@cellY -= deltaY
					if @statusMatrix[@cellY].isNew or key is rightKey
						@cellX = 0
					if key is downKey and @cellX > @statusMatrix[@cellY].string.length
						@cellX = @statusMatrix[@cellY].string.length
						
				@carelPos.left = @cellX*@cellWidth
				@carelPos.top = @cellY*@cellHeight
			return

		handleSpecialKeys: ($event, key) ->
			if key is tabKey
				$event.returnValue = false
				$event.preventDefault()
				$event.stopPropagation()
				#@statusMatrix[@cellY].string += "<p class='tab'></p>"
				return false
			return

		getKeyFromEvent = (event) ->
			key = event.keyCode or event.charCode or event.which
			return key

		#to be moved in utilities file
		selectText = (querySelector) ->
			#select all the text
			node = document.querySelector(querySelector)
			@selection = window.getSelection()
			if document.selection
				range = document.body.createTextRange()
				range.moveToElementText(node)
				range.select()
			else if window.getSelection
				range = document.createRange()
				range.selectNodeContents( node )
				range.selectNode(node)
				@selection.removeAllRanges()
				@selection.addRange(range)
			return

		pasteText: ($event) ->
			event = $event.originalEvent || $event
			pastedText = event.clipboardData.getData('text/plain')
			me = this
			_.each pastedText, (char) ->
				fakeInsertEvent =
					keyCode: char.charCodeAt(0)
				
				me.insertChar fakeInsertEvent
				return
			console.log(pastedText)
			return

		cutText = () ->
			return

		handleKeyDown: ($event) ->
			key = getKeyFromEvent($event)
			if key in [leftKey, upKey, rightKey, downKey]
				@moveArrow($event, key)
			else if key in [delKey1, delKey2]
				@deleteChar($event, key)
			else if key  is charA and $event.ctrlKey
				#tests to be added for this
				selectText(@containerQuery)
			else
				return @handleSpecialKeys($event, key)
			return

	return TextEditor
