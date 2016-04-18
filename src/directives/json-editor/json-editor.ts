angular.module('michaelzucchetta').directive(['$sce', '$timeout', '$interval',
	($sce, $timeout, $interval) => {
		return {
			restrict: 'E',
			scope: {
				jsonText: '='
			},
			templateUrl: '/directives/json-editor/json-editor.html',
			link: (scope) => {
				let display = $('#json-display');
				let textarea = $('#json-input');
				let container = $('json-input-container');

				scope.editor = new TextEditor('#json-display', '#json-input', '.json-input-container', 'cell');

				scope.setPosition = ($event) => {
					$timeout(() => {
						//checking if any text has been selected
						let selectedText = window.getSelection().toString();
					}, 10);
				};
			}
		}
	}
]);
