define ['TextEditor', 'jQuery'], (TextEditor) ->
	editorWidth = 800
	editorHeight = 416

	container = document.createElement "div"
	textarea = document.createElement "textarea"
	display = document.createElement "div"

	container.className = "containerClass"
	textarea.id = "textareaId"
	display.id = "displayId"

	document.body.appendChild(container)
	display.appendChild(textarea)
	container.appendChild(display)

	describe "Test TextEditor class", () ->
		editor = new TextEditor("#displayId", "#textareaId", ".containerClass", "cell")
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

		#reset editor
		editor.initEditor()

		it "test characters insertion", () ->
			#charCodeAt returns the keyCode for a char
			charEvent =
				keyCode: "a".charCodeAt(0)
			editor.insertChar(charEvent)
			expect(editor.textValue.length).toBe(1)
			editor.insertChar(charEvent)
			expect(editor.textValue).toBe("aa")
			return

		return
	
	return
