define ['premain', 'TextEditor'], (app, TextEditor) ->
	app.directive 'jsonEditor', ['$sce', '$timeout', '$interval', ($sce, $timeout, $interval) ->
		restrict: 'E'
		scope:
			jsonText: '='
		templateUrl: '/directives/json-editor/json-editor.html'
		css: '/directives/json-editor/json-editor.css'
		link: (scope, element, attrs) ->
			display = $('#json-display')
			textarea = $('#json-input')
			container = $('.json-input-container')
			
			scope.editor = new TextEditor('#json-display', '#json-input', '.json-input-container', 'cell')

			scope.insertCharacter = ($event) ->
				scope.editor.insertChar($event)
				scope.jsonText = scope.editor.textValue
				return

			scope.deleteCharacter = ($event) ->
				$timeout () ->
					scope.editor.deleteChar($event)
					return
				return

			scope.initCursor = (cursorId) ->
				$interval( () ->
					scope.hideCursor = !scope.hideCursor
					return
				, 500)

			angular.element(document).ready () ->
				$timeout () ->
					scope.editor.initEditor()
					return
				, 100
				scope.initCursor('cursor')
				textarea.focus()
				return

			return
	]
	return
