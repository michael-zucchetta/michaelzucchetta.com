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

		return
	
	return
