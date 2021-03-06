import TextEditor from 'js/classes/TextEditor';

class TextPortion {
	public y1: number;
	public x1: number;
	public y2: number;
	public x2: number;
	public text: string;
}

class JsonEditorCtrl {

	private noSingleClick: boolean;

	private hideCursor: boolean;

	private editor: TextEditor;

	private textarea: JQuery;

	private jsonText: string;

	private initEditor(): void {
		this.$timeout(() => this.editor.initEditor(), 100);
		this.initCursor('cursor');
		this.textarea.focus();
	}

	constructor(private $timeout: ng.ITimeoutService, private $interval: ng.IIntervalService) {
		let display: JQuery = $('#json-display');
		this.textarea = $('#json-input');
		let container: JQuery = $('json-input-container');

		this.editor = new TextEditor('#json-display', '#json-input', '.json-input-container', 'cell');
		angular.element(document).ready(() => this.initEditor());
	}

	public setPosition($event): void {
		let setPosition = (): void => {
			// checking if any text has been selected
			let selectedText: any = window.getSelection().toString();
			if (selectedText) {
				this.editor.selectText(selectedText);
			} else if (!this.noSingleClick) {
				this.editor.clickEditor($event);
			}
		};
		this.$timeout(setPosition, 10);
	}

	public insertCharacter ($event): void { // : ng.IAngularEvent): void {
		// a character has been inserted
		this.editor.insertChar($event);
		this.jsonText = this.editor.textValue;
	}

	public handleKeyDown($event): void { // : ng.IAngularEvent): void {
		this.$timeout(() => this.editor.handleKeyDown($event));
	}

	public initCursor(cursorId: string): void {
		this.$interval(() => this.hideCursor = !this.hideCursor, 500);
	}

	public selectWord($event): void {
		this.noSingleClick = true;
		console.log('double click', $event);
		this.editor.doubleClickEditor($event);
		// prevent single click to be triggered
		this.$timeout(() => this.noSingleClick = false);
	}

}

JsonEditorCtrl.$inject = ['$timeout', '$interval'];

export default JsonEditorCtrl;
