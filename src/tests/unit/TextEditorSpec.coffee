define ['TextEditor', 'jQuery'], (TextEditor) ->
	editorWidth = 800
	editorHeight = 416
	cellWidth = 8
	cellHeight = 16

	editor = null
	display = null
	textarea = null
	container = null

	charEvent = null
	newCharEvent = null
	charEventDel = null

	initTextEditorSpec = (nth) ->
		container = document.createElement "div"
		textarea = document.createElement "textarea"
		display = document.createElement "div"

		container.className = "containerClass" + nth
		textarea.id = "textareaId" + nth
		display.id = "displayId" + nth

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
			keyCode: 46

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
			editor.statusMatrix[mockedPosition.cellY].string = mockedString
			
			editor.clickEditor(mockedClick)
			expect(editor.cellX).toBe(mockedPosition.cellX)
			expect(editor.cellY).toBe(mockedPosition.cellY)

			expect(editor.carelPos.left).toBe(mockedCoordinates.x)
			expect(editor.carelPos.top).toBe(mockedCoordinates.y)

			expect( editor.getCellLetter(mockedPosition.cellY, mockedPosition.cellX) ).toBe mockedString[mockedPosition.cellX]
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
		
		it "test characters insertion", () ->
			#reset editor
			initTextEditorSpec(3)
			editor.initEditor()
			
			editor.insertChar(charEvent)
			charEvent.keyCode = "b".charCodeAt(0)
			editor.insertChar(charEvent)
			charEvent.keyCode = "c".charCodeAt(0)
			editor.insertChar(charEvent)
			charEvent.keyCode = "d".charCodeAt(0)
			editor.insertChar(charEvent)
			#46 is the deletion char
			editor.textValue = editor.textValue.substring(0, 3)
			editor.deleteChar(charEventDel)
			expect(editor.cellX).toBe(3)
			expect(editor.carelPos.left).toBe(3*cellWidth)

			return
		
		it "new line and deletion", () ->
			editor.insertChar(newCharEvent)
			expect(editor.cellY).toBe(1)
			editor.deleteChar(charEventDel)
			expect(editor.cellY).toBe(0)
			expect(editor.textValue).toBe(editor.statusMatrix[editor.cellY].string)
			expect(editor.cellX).toBe(3)
			expect(editor.carelPos.left).toBe(3*cellWidth)
			return

		return
	
	return
