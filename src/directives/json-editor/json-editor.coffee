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

			scope.setPosition = ($event) ->
				$timeout () ->
					#checking if any text has been selected
					selectedText = getSelection().toString()
					if (selectedText)
						console.log(selectedText)
					else if (!scope.noSingleClick)
						scope.editor.clickEditor($event)
					return
				, 10
				return
			
			scope.insertCharacter = ($event) ->
				#a character has been inserted
				scope.editor.insertChar($event)
				scope.jsonText = scope.editor.textValue
				return

			scope.handleKeyDown = ($event) ->
				$timeout () ->
					scope.editor.handleKeyDown($event)
					return
				return

			scope.selectWord = ($event) ->
				scope.noSingleClick = true
				console.log("double click", $event)
				scope.editor.doubleClickEditor($event)
				$timeout () ->
					#prevent single click to be triggered
					scope.noSingleClick = false
					return
				, 201
				return

			scope.pasteText = ($event) ->
				scope.editor.pasteText($event)
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
