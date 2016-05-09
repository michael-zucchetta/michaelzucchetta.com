import TextEditor from 'js/classes/TextEditor';
export default class JsonEditorCtrl {
	
	constructor($timeout: ng.ITimeoutService, $interval: ng.IIntervalService) {
		let display: JQuery = $('#json-display');
		let textarea: JQuery = $('#json-input');
		let container: JQuery = $('json-input-container');
		let vm: any = this;
		vm.editor = new TextEditor('#json-display', '#json-input', '.json-input-container', 'cell');

		vm.setPosition = ($event: ng.IAngularEvent): void => {
			let setPosition = (): void => {
				// checking if any text has been selected
				let selectedText: string = window.getSelection().toString();
				if (selectedText) {
					vm.editor.selectedText(selectedText);
				} else if (!vm.noSingleClick) {
					vm.editor.clickEditor($event);
				}
			};
			$timeout(setPosition, 10);
		};

		vm.insertCharacter = ($event: ng.IAngularEvent): void => {
		// a character has been inserted
		vm.editor.insertChar($event);
		vm.jsonText = vm.editor.textValue;
		};

		vm.handleKeyDown = ($event: ng.IAngularEvent): void => {
			$timeout(() => vm.editor.handleKeyDown($event));
		};

		vm.initCursor = (cursorId: number): void => {
			$interval(() => vm.hideCursor = !vm.hideCursor, 500);
		};

		angular.element(document).ready(() => {
			$timeout(() => vm.editor.initEditor(), 100);
			vm.initCursor('cursor');
			textarea.focus();
		});
	}
};

JsonEditorCtrl.$inject = ['$timeout', '$interval'];
interface IComponentOptionsCss extends ng.IComponentOptions {
	css: string;
};
let jsonEditorOpts: IComponentOptionsCss = {
	// restrict: 'E',
	bindings: {
		jsonText: '='
	},
	css: '/directives/json-editor/json-editor.css',
	templateUrl: '/directives/json-editor/json-editor.html',
	controller: JsonEditorCtrl
};
angular.module('michaelzucchetta').component('jsonEditor', jsonEditorOpts);
