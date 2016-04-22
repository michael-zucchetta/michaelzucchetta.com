(() => {
	function jsonEditorCtrl ($timeout: ng.ITimeoutService, $interval: ng.IIntervalService): void {
		let display: JQuery = $('#json-display');
		let textarea: JQuery = $('#json-input');
		let container: JQuery = $('json-input-container');
		let vm = this;
		this.test = "fefae";
		vm.editor = new TextEditor('#json-display', '#json-input', '.json-input-container', 'cell');

		vm.setPosition = ($event): void => {
			$timeout(() => {
				// checking if any text has been selected
				let selectedText = window.getSelection().toString();
				if (selectedText) {
					vm.editor.selectedText(selectedText);
				} else if (!vm.noSingleClick) {
					vm.editor.clickEditor($event);
				}
			}, 10);
		};

		vm.insertCharacter = ($event): void => {
			// a character has been inserted
			vm.editor.insertChar($event);
			vm.jsonText = vm.editor.textValue;
		};

		vm.handleKeyDown = ($event): void => {
			$timeout(() => {
				vm.editor.handleKeyDown($event);
			});
		};

		vm.initCursor = (cursorId: number): void => {
			$interval(() => {
				vm.hideCursor = !vm.hideCursor;
			}, 500);
		};

		angular.element(document).ready(() => {
			$timeout(() => {
				vm.editor.initEditor();
			}, 100);
			vm.initCursor('cursor');
			textarea.focus();
		});
		this.test = 5;
	};

	jsonEditorCtrl.$inject = ['$timeout', '$interval'];
	interface IComponentOptionsCss extends angular.IComponentOptions {
		css: string;
	};
	let jsonEditorOpts: IComponentOptionsCss = {
		// restrict: 'E',
		bindings: {
			jsonText: '='
		},
		css: '/directives/json-editor/json-editor.css',
		templateUrl: '/directives/json-editor/json-editor.html',
		controller: jsonEditorCtrl
	};
	angular.module('michaelzucchetta').component('jsonEditor', jsonEditorOpts);
})();
