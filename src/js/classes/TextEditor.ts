class CarelPos {
	public left: number;
	public top: number;
}
class statusArray extends Array {
	public isNew: boolean;
	public string: string;
}
class TextEditor {
	private display: HTMLElement;
	private textarea: HTMLElement;
	private container: HTMLElement;
	private cellWidth: number = 8;
	private cellHeight: number = 16;
	private editorWidth: number;
	private editorHeight: number;
	private colsNumber: number;
	private rowsNumber: number;
	public statusMatrix: statusArray[];
	private textValue: string = "";
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
		this.display = $(displayQuery)[0];
		this.textarea = $(textareaQuery)[0];
		this.container = $(containerQuery)[0];
		
	}
}
