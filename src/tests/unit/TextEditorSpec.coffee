define ['TextEditor', 'jQuery'], (TextEditor) ->
	editorWidth = 800
	editorHeight = 416
	cellWidth = 8
	cellHeight = 16

	delKey = 46

	leftKey = 37
	upKey = 38
	rightKey = 39
	downKey = 40

	editor = null
	display = null
	textarea = null
	container = null

	charEvent = null
	newCharEvent = null
	charEventDel = null
	
	#move events
	leftArrowEvent = null
	rightArrowEvent = null
	downArrowEvent = null
	upArrowEvent = null

	uselessCharEvent = null

	setInitialStrings = (strings) ->
		_.each strings, (string, index) ->
			editor.statusMatrix[index].isNew = false
			editor.statusMatrix[index].string = string
			return
		editor.cellY = strings.length - 1
		editor.cellX = strings[strings.length - 1].length
		editor.carelPos.left = editor.cellX*cellWidth
		editor.carelPos.top = editor.cellY*cellHeight
		return

	initTextEditorSpec = (nth) ->
		container = document.createElement "div"
		textarea = document.createElement "textarea"
		display = document.createElement "div"

		container.className = "containerClass" + nth
		textarea.id = "textareaId" + nth
		display.id = "displayId" + nth

		container.style.height = editorHeight + "px"
		textarea.style.height = editorHeight + "px"
		display.style.height = editorHeight + "px"

		document.body.appendChild(container)
		display.appendChild(textarea)
		container.appendChild(display)
		editor = new TextEditor("#displayId" + nth, "#textareaId" + nth, ".containerClass" + nth, "cell"+nth)
		charEvent =
			keyCode: "a".charCodeAt(0)
		#13 is new char
		newCharEvent =
			keyCode: 13
		#46 (or 8) is the deletion char
		charEventDel =
			keyCode: delKey
		
		#37 is the left arrow key
		leftArrowEvent =
			keyCode: leftKey
		
		#38 is the up arrow key
		upArrowEvent =
			keyCode: upKey
		
		#39 is the right arrow key
		rightArrowEvent =
			keyCode: rightKey
		
		#40 is the down arrow key
		downArrowEvent =
			keyCode: downKey
		
		uselessCharEvent =
			keyCode: 99

		return

	describe "Test TextEditor class", () ->
		initTextEditorSpec(1)

		it "are the html elements initialized?", () ->
			expect(editor.display).toBeTruthy()
			expect(editor.textarea).toBeTruthy()
			expect(editor.container).toBeTruthy()
			return

		$(display).css({
			position: 'absolute',
			width: editorWidth,
			height: editorHeight
		})

		editor.initEditor()

		it "are properties initialized?", () ->
			expect(editor.editorWidth).toBe(editorWidth)
			expect(editor.editorHeight).toBe(editorHeight)
			return
		
		mockedClick =
			offsetX: 202
			offsetY: 4
			target:
				offsetTop: 50
		
		mockedPosition =
			cellX: 25
			cellY: 3

		mockedCoordinates =
			x: 200
			y: 48

		it "empty text, so cellX is zero", () ->
			editor.clickEditor(mockedClick)
			expect(editor.cellX).toBe(0)
			return

		it "click on the editor with non empty string", () ->
			#set editor text
			mockedString = "abcdefghjklmnopqrstuwyxz123"
			editor.clickEditor({
				offsetX: 0
				offsetY: cellHeight + 2
				target:
					offsetTop: 0
			})
			expect(editor.cellX).toEqual(0, "it should be get 0,0 as it is empty")
			expect(editor.cellY).toEqual(0, "it should be get 0,0 as it is empty")
			
			setInitialStrings(['test', 'abc', "third", mockedString, "fourth"])
			
			editor.clickEditor(mockedClick)
			expect(editor.cellX).toBe(mockedPosition.cellX)
			expect(editor.cellY).toBe(mockedPosition.cellY)

			expect(editor.carelPos.left).toBe(mockedCoordinates.x)
			expect(editor.carelPos.top).toBe(mockedCoordinates.y)

			expect( editor.getCellLetter(mockedPosition.cellY, mockedPosition.cellX) ).toBe mockedString[mockedPosition.cellX]
			

			mockedClick.offsetY = 200
			editor.clickEditor(mockedClick)
			expect(editor.cellY).toBe(5)
			expect(editor.carelPos.top).toBe(5*cellHeight)
			return


		it "test characters insertion", () ->
			#reset editor
			initTextEditorSpec(2)
			editor.initEditor()
			#charCodeAt returns the keyCode for a char
			editor.insertChar(charEvent)
			expect(editor.textValue.length).toBe(1)
			editor.insertChar(charEvent)
			expect(editor.textValue).toBe("aa")
			expect(editor.statusMatrix[0].isNew).toBe(false)
			expect(editor.statusMatrix[0].string).toBe("aa")
			expect(editor.carelPos.left).toBe(cellWidth*2)
			expect(editor.carelPos.top).toBe(0)
			

			#new chars
			editor.insertChar(newCharEvent)
			expect(editor.cellY).toBe(1)
			expect(editor.carelPos.left).toBe(0)
			expect(editor.carelPos.top).toBe(cellHeight*1)
			
			editor.insertChar(newCharEvent)
			editor.insertChar(newCharEvent)
			editor.insertChar(newCharEvent)
			expect(editor.cellY).toBe(4)
			expect(editor.cellX).toBe(0)
			expect(editor.carelPos.top).toBe(cellHeight*4)

			return
		carelXPos = 0
		it "test characters insertion and deletion", () ->
			#reset editor
			initTextEditorSpec(3)
			editor.initEditor()
			
			editor.insertChar(charEvent)
			carelXPos++
			charEvent.keyCode = "b".charCodeAt(0)
			editor.insertChar(charEvent)
			carelXPos++
			charEvent.keyCode = "c".charCodeAt(0)
			editor.insertChar(charEvent)
			carelXPos++
			charEvent.keyCode = "d".charCodeAt(0)
			editor.insertChar(charEvent)
			carelXPos++
			
			#46 is the deletion char
			carelXPos--
			editor.textValue = editor.textValue.substring(0, carelXPos)
			editor.deleteChar(charEventDel, delKey)
			expect(editor.cellX).toBe(carelXPos)
			expect(editor.carelPos.left).toBe(carelXPos*cellWidth)

			return
		
		it "new line and deletion", () ->
			editor.insertChar(newCharEvent)
			expect(editor.cellY).toEqual(1, "cellY value was not changed when a new char was inserted")
			editor.deleteChar(charEventDel, delKey)
			expect(editor.cellY).toEqual(0, "cellY was not decreased after char deletion")
			expect(editor.textValue).toBe(editor.statusMatrix[editor.cellY].string)
			expect(editor.cellX).toBe(carelXPos)
			expect(editor.carelPos.left).toBe(carelXPos*cellWidth)
			
			#delete everything
			editor.deleteChar(charEventDel, delKey)
			editor.deleteChar(charEventDel, delKey)
			editor.deleteChar(charEventDel, delKey)
			editor.deleteChar(charEventDel, delKey)
			editor.deleteChar(charEventDel, delKey)
			editor.deleteChar(charEventDel, delKey)
			editor.deleteChar(charEventDel, delKey)
			expect(editor.cellX).toEqual(0, "it should be on 0, 0 coordinates")
			expect(editor.cellY).toEqual(0, "it should be on 0, 0 coordinates")
			return


		it "use directional arrows", () ->
			#reset editor
			initTextEditorSpec(4)
			editor.initEditor()
			setInitialStrings(['test', 'abc'])
			editor.moveArrow(uselessCharEvent)
			carelXPos = 3
			#2
			editor.moveArrow(leftArrowEvent, leftKey)
			carelXPos--
			expect(editor.cellX).toBe(carelXPos)
			expect(editor.carelPos.left).toBe(carelXPos*cellWidth)
			
			#1
			editor.moveArrow(leftArrowEvent, leftKey)
			carelXPos--
			expect(editor.cellX).toBe(carelXPos)
			expect(editor.carelPos.left).toBe(cellWidth)

			#0
			editor.moveArrow(leftArrowEvent, leftKey)
			carelXPos--
			expect(editor.cellX).toBe(0)
			expect(editor.carelPos.left).toBe(0)
			
			#-1
			editor.moveArrow(leftArrowEvent, leftKey)
			carelXPos--
			expect(editor.cellY).toEqual(0, "cellY has not changed after left key has been pressed")
			expect(editor.cellX).toEqual(4, "cellX has not changed after left key has been pressed and brought back to the upper line")
			expect(editor.carelPos.left).toEqual(4*cellWidth, "carelPos.left has changed after left key")
			expect(editor.carelPos.top).toEqual(0, "carelPos.top has not changed after it has gone up")

			#right key
			editor.handleKeyDown(rightArrowEvent)
			carelXPos++
			expect(editor.cellY).toEqual(1, "cellY has not increased after right key has been pressed")
			expect(editor.cellX).toEqual(0, "right key on a new line always mean 0 as cellX")
			
			#back
			editor.moveArrow(leftArrowEvent, leftKey)

			#down key
			editor.handleKeyDown(downArrowEvent)
			expect(editor.cellY).toEqual(1, "cellY should be increased")
			editor.handleKeyDown(downArrowEvent)
			expect(editor.cellY).toEqual(2, "cellY should be increased")
			editor.handleKeyDown(downArrowEvent)
			expect(editor.cellY).toEqual(2, "cellY should be the same as before because there are no new lines")
			
			mockedClick.offsetY = 0
			mockedClick.target.offsetTop = 0
			editor.clickEditor(mockedClick)
			expect(editor.cellY).toEqual(0, "set to the first line failed")
			expect(editor.cellX).toEqual(4, "length of the fist string, 'test', should be equal to cellX")

			editor.handleKeyDown(downArrowEvent)
			expect(editor.cellY).toEqual(1, "new line")
			expect(editor.cellX).toEqual(3, "cellX should be equal to the second line, , 'abc'")
			
			editor.handleKeyDown(upArrowEvent)
			expect(editor.cellY).toEqual(0, "up arrow should have go to the first line")
			expect(editor.cellX).toEqual(3, "up should mantain the length of 'abc'")
			return
		
		return
	
	return
