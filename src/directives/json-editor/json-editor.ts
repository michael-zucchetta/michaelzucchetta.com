angular.module('michaelzucchetta').component(['$sce', '$timeout', '$interval',
	($sce, $timeout, $interval) => {
		return {
			restrict: 'E',
			scope: {
				jsonText: '='
			},
			templateUrl: '/directives/json-editor/json-editor.html',
			css: '/directives/json-editor/json-editor.css',
			controller: (scope) => {
				let display: JQuery = $('#json-display');
				let textarea: JQuery = $('#json-input');
				let container: JQuery = $('json-input-container');

				scope.editor = new TextEditor('#json-display', '#json-input', '.json-input-container', 'cell');

				scope.setPosition = ($event): void => {
					$timeout(() => {
						// checking if any text has been selected
						let selectedText = window.getSelection().toString();
						if (selectedText) {
							scope.editor.selectedText(selectedText);
						} else if (!scope.noSingleClick) {
							scope.editor.clickEditor($event);
						}
					}, 10);
				};

				scope.insertCharacter = ($event): void => {
					//a character has been inserted
					scope.editor.insertChar($event);
					scope.jsonText = scope.editor.textValue;
				};

				scope.handleKeyDown = ($event): void => {
					$timeout(() => {
						scope.editor.handleKeyDown($event);
					});
				};

			}
		};
	}
]);
