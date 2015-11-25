define ['TextEditor', 'jQuery'], (TextEditor) ->
	editorWidth = 800
	editorHeight = 416
	editor = null
	display = null
	textarea = null
	container = null

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
			charEvent =
				keyCode: "a".charCodeAt(0)
			editor.insertChar(charEvent)
			expect(editor.textValue.length).toBe(1)
			editor.insertChar(charEvent)
			expect(editor.textValue).toBe("aa")
			
			newCharEvent =
				keyCode: 13

			editor.insertChar(newCharEvent)
			expect(editor.cellY).toBe(1)
			return

		return
	
	return
