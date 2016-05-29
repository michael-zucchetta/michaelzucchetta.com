import Keys from 'js/classes/Keys';

class CarelPos {
	public left: number;
	public top: number;
}

class Status {
	public isNew: boolean;
	public string: string;
	public id: string;
};

class TextPortion {
	public y1: number;
	public x1: number;
	public y2: number;
	public x2: number;
	public text: string;
}

export default class TextEditor {
	public textValue: string = '';
	public selectedText: TextPortion;
	public statusMatrix: Status[];
	public cellX: number = 0;
	public cellY: number = 0;
	public carelPos: CarelPos = {
		left: 0,
		top: 0
	};

	private _display: JQuery;
	private _textarea: JQuery;
	private _container: JQuery;
	private cellWidth: number = 8;
	private cellHeight: number = 16;
	private editorWidth: number;
	private editorHeight: number;
	private colsNumber: number;
	private rowsNumber: number;
	private rowSuffix: string = '';

	constructor(displayQuery: string, textareaQuery: string, containerQuery: string, rowSuffix: string) {
		/**
		 * rowSuffix is the name of the single row class, such as cell html elements
		 * display is where the text is displayed
		 * textarea is the textarea itself (not visible)
		 * container is the html element containing the editor
		 */
		this._display = $(displayQuery);
		this._textarea = $(textareaQuery);
		this._container = $(containerQuery);
		this.rowSuffix = rowSuffix;
	}

	get display(): JQuery {
		return this._display;
	}

	get textarea(): JQuery {
		return this._textarea;
	}

	get container(): JQuery {
		return this._container;
	}

	get height(): number {
		return this.editorHeight;
	}

	get width(): number {
		return this.editorWidth;
	}

	public getCellLetter(y: number, x: number): string {
		return this.statusMatrix[y].string[x];
	}

	public initEditor(): void {
		this.editorWidth = this._display.outerWidth();
		this.editorHeight = this._display.outerHeight();
		this.colsNumber = Math.round(this.editorWidth / this.cellWidth);
		this.rowsNumber = Math.round(this.editorHeight / this.cellHeight);
		this.statusMatrix = new Array(this.rowsNumber);
		this.statusMatrix = _.map(this.statusMatrix, (el: Status, $index: number): Status => {
			el = new Status();
			el.isNew = true;
			el.string = '';
			el.id = this.rowSuffix + $index;
			return el;
		});
	}

	public clickEditor($event): void {
		// x/cellWidth is the partial cell position, with round it's the cell number
		this.cellX = Math.round($event.offsetX / this.cellWidth);

		let tmpY: number = ($event.target.offsetTop + $event.offsetY) / this.cellHeight;
		this.cellY = Math.round(tmpY);

		let cellText: string = this.getCellString(this.cellY);
		if (cellText) {
			if (cellText.length < this.cellX) {
				this.cellX = cellText.length;
			}
			this.textarea.val(cellText);
		} else {
			this.cellX = 0;
		}

		if (this.cellY > this.getLastRowIndex()) {
			this.cellY = this.getLastRowIndex();
		}

		let y: number = this.cellY * this.cellHeight;
		let x: number = this.cellX * this.cellWidth;
		this.carelPos.left = x;
		this.carelPos.top = y;
		this.textarea.focus();
	}

	public addCharacterToEditor(key: number): void {
		let newChar: string = String.fromCharCode(key);

		if (!Keys.isDelKey(key) && !Keys.isNewLineKey(key)) {
			this.carelPos.left += this.cellWidth;
			if (this.statusMatrix[this.cellY].isNew) {
				this.textValue = this.statusMatrix[this.cellY].string = newChar;
				this.statusMatrix[this.cellY].isNew = false;
			} else {
				let tmpString: string = this.statusMatrix[this.cellY].string;
				this.statusMatrix[this.cellY].string = tmpString.substring(0, this.cellX) + newChar + tmpString.substring(this.cellX, tmpString.length);
				this.textValue += newChar;
			}
			this.cellX++;
		}
		if (Keys.isNewLineKey(key)) {
			this.carelPos.left = 0;
			this.carelPos.top += this.cellHeight;
			this._textarea.val('');
			this.textValue = '';
			this.cellX = 0;
			this.cellY++;
		}
	};

	public selectText(selectedText): void {
		this.selectedText = selectedText;
	}

	public insertChar($event: KeyboardEvent): void {
		let key: number = Keys.getKeyFromEvent($event);
		this.addCharacterToEditor(key);
	}

	public moveArrow($event: KeyboardEvent, key: number): void {
		let done: boolean = false;
		let deltaX: number = NaN;
		let deltaY: number = NaN;

		switch (key) {
			case Keys.leftKey:
				deltaX = -1;
			break;
			case Keys.upKey:
				deltaY = -1;
			break;
			case Keys.rightKey:
				deltaX = 1;
			break;
			case  Keys.downKey:
				deltaY = 1;
			break;
			default:
				return;
		}

		if (this.cellX + deltaX < 0) {
			deltaY = -1;
		}
		if (this.cellX + deltaX >= this.statusMatrix[this.cellY].string.length && key !== Keys.upKey) {
			deltaY = 1;
		} else if (this.cellX + deltaX >= 0) {
			this.cellX += deltaX;
			this.carelPos.left += this.cellWidth * deltaX;
			done = true;
		}
		if (this.cellY + deltaY >= 0 && !done) {
			this.cellY += deltaY;
			if (deltaY < 0) {
				if (key !== Keys.upKey || this.cellX > this.statusMatrix[this.cellY].string.length) {
					this.cellX = this.statusMatrix[this.cellY].string.length;
				}
			} else {
				if (this.statusMatrix[this.cellY - deltaY].isNew) {
					this.cellY -= deltaY;
				}
				if (this.statusMatrix[this.cellY].isNew || key === Keys.rightKey) {
					this.cellX = 0;
				}
				if (key === Keys.downKey && this.cellX > this.statusMatrix[this.cellY].string.length) {
					this.cellX = this.statusMatrix[this.cellY].string.length;
				}
			}
			this.carelPos.left = this.cellX * this.cellWidth;
			this.carelPos.top = this.cellY * this.cellHeight;
		}
	}

	public handleKeyDown($event: KeyboardEvent): void {
		// add tests for this
		let key = Keys.getKeyFromEvent($event);
		if (Keys.isArrowKey(key)) {
			this.moveArrow($event, key);
		} else if (Keys.isDelKey(key)) {
			this.deleteChar($event, key);
		} else if (key === Keys.charA && ($event.ctrlKey || $event.metaKey)) {
			/**
			 * select all
			 * to be fixed on Mac
			 * tests to be added for this
			 */
			// this.selectText(this.containerQuery);
		} else {
			// return this.handleSpecialkeys($event, key);
		}
	}

	public deleteChar($event: KeyboardEvent, key: number): void {
		let cellText: string = this.statusMatrix[this.cellY].string;
		if (!Keys.isDelKey(key)) {
			return;
		}
		if (this.statusMatrix[this.cellY].string.length === 0) {
			this.statusMatrix[this.cellY].string = '';
			this.statusMatrix[this.cellY].isNew = true;
			if (this.cellY !== 0) {
				this.cellY--;
				this.carelPos.top -= this.cellHeight;
				this.cellX = this.statusMatrix[this.cellY].string.length;
				this.textValue = this.statusMatrix[this.cellY].string;
				this.carelPos.left = this.cellWidth * this.cellX;
			}
		} else {
			// concatenate two strings: one from zero to the cursor's position and then from the cursor's position to the end of the string
			let firstSubPart: string = cellText.substring(0, this.cellX - 1);
			let secondSubPart: string = cellText.substring(this.cellX, cellText.length);
			this.statusMatrix[this.cellY].string = this.textValue = firstSubPart + secondSubPart;
			this.carelPos.left -= this.cellWidth;
			this.cellX--;
			if (this.cellX < 0) {
				// if it's going out of the screen
				this.cellX = 0;
			}
		}
	}

	public pasteText($event): void {
		let event = $event.originalEvent || $event;
		let pastedText: string = event.clipboardData.getData('text/plain');
		_.each(pastedText, (char: string) => {
			this.addCharacterToEditor(char.charCodeAt(0));
		});
	}

	public cutText(): void {
		return undefined;
	}


	public doubleClickEditor($event) {
		console.log("double click", $event);
	}

	private getLastRowIndex(): number {
		let $index: number = undefined;
		_.each(this.statusMatrix, (row: Status, index: number) => {
			if (row.isNew && $index === undefined) {
				$index = index;
			}
		});
		return $index;
	}

	private getCellString(y: number): string {
		return this.statusMatrix[y].string;
	}
}
