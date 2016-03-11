class CarelPos {
	public left: number;
	public top: number;
}
class Status {
	public isNew: boolean;
	public string: string;
	public id: string;
};
class TextEditor {
	private _display: JQuery;
	private _textarea: JQuery;
	private _container: JQuery;
	private cellWidth: number = 8;
	private cellHeight: number = 16;
	private editorWidth: number;
	private editorHeight: number;
	private colsNumber: number;
	private rowsNumber: number;
	private textValue: string = "";
	private rowSuffix: string = "";
	
	public statusMatrix: Status[];
	public cellX: number = 0;
	public cellY: number = 0;
	public carelPos: CarelPos = {
		left: 0,
		top: 0
	};

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

	public initEditor() {
		this.editorWidth = this._display.outerWidth();
		this.editorHeight = this._display.outerHeight();
		this.colsNumber = Math.round(this.editorWidth/this.cellWidth);
		this.rowsNumber = Math.round(this.editorHeight/this.cellHeight);
		this.statusMatrix = new Array(this.rowsNumber);
		let that = this;
		this.statusMatrix = _.map(this.statusMatrix, function(el, $index) {
			el = new Status();
			el.isNew = true;
			el.string = "";
			el.id = that.rowSuffix + $index;
			return el;
		});
	}

	public clickEditor($event) {
		// x/cellWidth is the partial cell position, with round it's the cell number
		let tmpX: number = $event.offsetX/this.cellWidth;
	}
}
