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
			expect(editor.carelPos.top).toBe(5 * cellHeight);

		});

		it("test characters insertion", () => {
		       	initTextEditorSpec(2);
			editor.initEditor();
			//charCodeAt returns the keyCode for a char
			editor.insertChar(charEvent);
			expect(editor.textValue.length).toBe(1);
			editor.insertChar(charEvent);
			expect(editor.textValue).toBe("aa");
			expect(editor.statusMatrix[0].isNew).toBe(false);
			expect(editor.statusMatrix[0].string).toBe("aa");
			expect(editor.carelPos.left).toBe(cellWidth * 2);
			expect(editor.carelPos.top).toBe(0);
                       
			//new chars
			editor.insertChar(newCharEvent);
			expect(editor.cellY).toBe(1);
			expect(editor.carelPos.left).toBe(0);
			expect(editor.carelPos.top).toBe(cellHeight * 1);
			editor.insertChar(newCharEvent);
			editor.insertChar(newCharEvent);
			editor.insertChar(newCharEvent);
			expect(editor.cellY).toBe(4);
			expect(editor.cellX).toBe(0);
			expect(editor.carelPos.top).toBe(cellHeight * 4);
		});

		let carelXPos = 0;
		it("test characters insertion and deletion", () => {
			//reset editor
			initTextEditorSpec(3);
			editor.initEditor();
			editor.insertChar(charEvent);
			carelXPos++;
			charEvent.keyCode = "b".charCodeAt(0);
			editor.insertChar(charEvent);
			carelXPos++;
			charEvent.keyCode = "c".charCodeAt(0);	
			editor.insertChar(charEvent);
			carelXPos++;
			charEvent.keyCode = "d".charCodeAt(0);
			editor.insertChar(charEvent);
			carelXPos++;

			//46 is the deletion char
			carelXPos--;
			editor.textValue = editor.textValue.substring(0, carelXPos);
			editor.deleteChar(charEventDel, delKey);
			expect(editor.cellX).toBe(carelXPos);
			expect(editor.carelPos.left).toBe(carelXPos * cellWidth);
		});

		it("new line and deletion", () => {
	        	editor.insertChar(newCharEvent)
			expect(editor.cellY).toEqual(1, "cellY value was not changed when a new char was inserted")
			editor.deleteChar(charEventDel, delKey)
			
			expect(editor.cellY).toEqual(0, "cellY was not decreased after char deletion")

			expect(editor.textValue).toBe(editor.statusMatrix[editor.cellY].string)

			expect(editor.cellX).toBe(carelXPos)

			expect(editor.carelPos.left).toBe(carelXPos*cellWidth)

			//delete everything			
			editor.deleteChar(charEventDel, delKey);
			editor.deleteChar(charEventDel, delKey);
			editor.deleteChar(charEventDel, delKey);
			editor.deleteChar(charEventDel, delKey);
			editor.deleteChar(charEventDel, delKey);
			editor.deleteChar(charEventDel, delKey);
			editor.deleteChar(charEventDel, delKey);
			expect(editor.cellX).toEqual(0, "it should be on 0, 0 coordinates");
			expect(editor.cellY).toEqual(0, "it should be on 0, 0 coordinates");
		});

		it("use directional arrows", () => {
			//reset editor
			initTextEditorSpec(4)
			editor.initEditor()
			setInitialStrings(['test', 'abc'])
			editor.moveArrow(uselessCharEvent)
			carelXPos = 3
			//2
			editor.moveArrow(leftArrowEvent, leftKey)
			carelXPos--;
			expect(editor.cellX).toBe(carelXPos);
			expect(editor.carelPos.left).toBe(carelXPos*cellWidth);
		   
			//1
			editor.moveArrow(leftArrowEvent, leftKey);
			carelXPos--;
			expect(editor.cellX).toBe(carelXPos);
			expect(editor.carelPos.left).toBe(cellWidth);

			//0
			editor.moveArrow(leftArrowEvent, leftKey);
			carelXPos--;
			expect(editor.cellX).toBe(0);
			expect(editor.carelPos.left).toBe(0);
           
			//-1
			editor.moveArrow(leftArrowEvent, leftKey);
			carelXPos--;
			expect(editor.cellY).toEqual(0, "cellY has not changed after left key has been pressed");
			expect(editor.cellX).toEqual(4, "cellX has not changed after left key has been pressed and brought back to the upper line");
			expect(editor.carelPos.left).toEqual(4*cellWidth, "carelPos.left has changed after left key");
			expect(editor.carelPos.top).toEqual(0, "carelPos.top has not changed after it has gone up");

			//right key			
			editor.handleKeyDown(rightArrowEvent);
			carelXPos++;
			expect(editor.cellY).toEqual(1, "cellY has not increased after right key has been pressed");
			expect(editor.cellX).toEqual(0, "right key on a new line always mean 0 as cellX");
			
			//back
			editor.moveArrow(leftArrowEvent, leftKey);

			//down key		
			editor.handleKeyDown(downArrowEvent);
			expect(editor.cellY).toEqual(1, "cellY should be increased");
			editor.handleKeyDown(downArrowEvent);
			expect(editor.cellY).toEqual(2, "cellY should be increased");
			editor.handleKeyDown(downArrowEvent);
			expect(editor.cellY).toEqual(2, "cellY should be the same as before because there are no new lines");
			mockedClick.offsetY = 0;
			mockedClick.target.offsetTop = 0;
			editor.clickEditor(mockedClick);
			expect(editor.cellY).toEqual(0, "set to the first line failed");
			expect(editor.cellX).toEqual(4, "length of the fist string, 'test', should be equal to cellX");
			editor.handleKeyDown(downArrowEvent);
			expect(editor.cellY).toEqual(1, "new line");
			expect(editor.cellX).toEqual(3, "cellX should be equal to the second line, , 'abc'");
			editor.handleKeyDown(upArrowEvent);
			expect(editor.cellY).toEqual(0, "up arrow should have go to the first line");
			expect(editor.cellX).toEqual(3, "up should mantain the length of 'abc'");
		});

		it("use of copy/paste", () => {
			//reset editor
			initTextEditorSpec(5);
			editor.initEditor();
			setInitialStrings(['a', 'f']);
			
			//last char, last line
			let mockedPastedText = "cane";
			let mockedPasteEvent = {
				clipboardData: {
					getData: () => {
						return mockedPastedText;
					}
				}
			};
			editor.pasteText(mockedPasteEvent);
			expect(editor.cellY).toEqual(1, "messed up during pasted text on Y");
			expect(editor.cellX).toEqual(5, "messed up during pasted text on X");
			mockedPastedText = "a\na";
			editor.pasteText(mockedPasteEvent);
			expect(editor.cellY).toEqual(2, "messed up during pasted text with new line on Y");
			expect(editor.cellX).toEqual(1, "messed up during pasted text with new line on X");
		});
	});

});
