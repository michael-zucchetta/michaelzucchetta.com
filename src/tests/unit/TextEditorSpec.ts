class ZEvent {
	offsetX: number;
	offsetY: number;
	target: any;
}
describe ("Test TextEditor class", () => {

	let editor: TextEditor;
	let display;
	let textarea;
	let container;

	let charEvent: KeyboardEvent = new KeyboardEvent("0");
	let newCharEvent: KeyboardEvent = new KeyboardEvent("0");
	let charEventDel: KeyboardEvent = new KeyboardEvent("0");

	//move events
	let leftArrowEvent: KeyboardEvent = new KeyboardEvent("0");
	let rightArrowEvent: KeyboardEvent = new KeyboardEvent("0");
	let downArrowEvent: KeyboardEvent = new KeyboardEvent("0");
	let upArrowEvent: KeyboardEvent = new KeyboardEvent("0");

	let uselessCharEvent: KeyboardEvent = new KeyboardEvent("0");


	let mockedString: string = "";	
	let mockedClickEvent: ZEvent = new ZEvent();
	mockedClickEvent.target = {};


	//To be moved in another file
	let cellWidth: number = 8;
	let cellHeight: number = 16;
	let editorWidth: number = 800;
	let editorHeight: number = 416;

	//to be moved as well
	let delKey = 46;
	
	let newKey = 13;

	let leftKey = 37;
	let upKey = 38;
	let rightKey = 39;
	let downKey = 40;

	let setInitialStrings = (strings: string[]) => {
		_.each(strings, (string, $index) => {
			editor.statusMatrix[$index].isNew = false;
			editor.statusMatrix[$index].string = string;
		});
		editor.cellY = strings.length - 1;
		editor.cellX = strings[strings.length - 1].length;
		editor.carelPos.left = editor.cellX*cellWidth;
		editor.carelPos.top = editor.cellY*cellHeight;
	};

	let initTextEditorSpec = (nth: number) => {
		container = document.createElement("div");
		textarea = document.createElement("textarea");
		display = document.createElement("div");

		container.className = "containerClass" + nth;
		textarea.id = "textareaId" + nth;
		display.id = "displayId" + nth;

		container.style.height = editorHeight + "px";
		textarea.style.height = editorHeight + "px";
		display.style.height = editorHeight + "px";

		document.body.appendChild(container);
		display.appendChild(textarea);
		container.appendChild(display);
		editor = new TextEditor("#displayId" + nth, "#textareaId" + nth, ".containerClass" + nth, "cell" + nth);

		charEvent.keyCode = "a".charCodeAt(0);
		
		newCharEvent.keyCode = newKey;
		charEventDel.keyCode = delKey;

		leftArrowEvent.keyCode = leftKey;
		rightArrowEvent.keyCode = rightKey;
		downArrowEvent.keyCode = downKey;
		upArrowEvent.keyCode = upKey;

		uselessCharEvent.keyCode = 99;
	};

	describe("Test TextEditor class", () => {
		initTextEditorSpec(1);

		it("are the html elements intialised?", () => {
			expect(editor.display).toBeTruthy();
			expect(editor.textarea).toBeTruthy();
			expect(editor.container).toBeTruthy();
		});
	
		$(display).css({
			position: 'absolute',
			width: editorWidth,
			height: editorHeight
		});

		editor.initEditor();

		it("editor properties initialised?", () => {
			expect(editor.width).toEqual(editorWidth);
			expect(editor.height).toEqual(editorHeight);
		});


		mockedClickEvent.offsetX = 202;
		mockedClickEvent.offsetY = 4;
		mockedClickEvent.target.offsetTop = 50;

		let mockedPosCellX: number = 25;
		let mockedPosCellY: number = 3;
		let mockedCoordX: number = 200;
		let mockedCoordY: number = 48;

		it("empty text => cellX is 0", () => {
			editor.clickEditor(mockedClickEvent);
			expect(editor.cellX).toEqual(0, "it should be get 0,0 as it is empty");
			expect(editor.cellY).toEqual(0, "it should be get 0,0 as it is empty");
			
		});

		it("click on the editor with non empty string", () => {
			//set editor text
			mockedString = "abcdefghjklmnopqrstuwyxz123";
			editor.clickEditor({
				offsetX: 0,
				offsetY: cellHeight + 2,
				target: {
					offsetTop: 0
				}
			});
			expect(editor.cellX).toEqual(0, "it should be get 0,0 as it is empty");
			expect(editor.cellY).toEqual(0, "it should be get 0,0 as it is empty");
			
			setInitialStrings(['test', 'abc', "third", mockedString, "fourth"]);
			editor.clickEditor(mockedClickEvent);
			
			expect(editor.cellX).toEqual(mockedPosCellX, "click editor doesn't go to the " + editor.cellX + "th line");
			expect(editor.cellY).toEqual(mockedPosCellY, "it doesn't get the height in pixels on the " + editor.cellY + "th line");
		
			expect(editor.carelPos.left).toEqual(mockedCoordX, "click doesn't match coordinates X");
			expect(editor.carelPos.top).toEqual(mockedCoordY, "click doesn't match coordinates Y");

			expect( editor.getCellLetter(mockedPosCellY, mockedPosCellX) ).toBe(mockedString[mockedPosCellX]);
			
			mockedClickEvent.offsetY = 200;
			editor.clickEditor(mockedClickEvent);
			expect(editor.cellY).toBe(5);
			expect(editor.carelPos.top).toBe(5*cellHeight);

		});

	});

});
