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
				cell = $("#cell"+cellY)
				key = $event.keyCode || $event.charCode
				newChar = String.fromCharCode(key)
				#not del key and not newline
				if (key isnt 8 and key isnt 46 and key isnt 13)
					scope.carelPos.left += cellWidth
					#TBD scope.editorStatusMatrix[cellY][cellX] = newChar
					if (scope.editorStatusMatrix[cellY].isNew)
					
						scope.editorStatusMatrix[cellY].string = newChar
						scope.editorStatusMatrix[cellY].isNew = false
					else
						tmpString = scope.editorStatusMatrix[cellY].string
						scope.editorStatusMatrix[cellY].string = tmpString.substring(0, cellX) + newChar + tmpString.substring(cellX, tmpString.length)
					cellX++
				if (key is 13)
					#13 is newline
					scope.carelPos.left = 0
					scope.carelPos.top += cellHeight
					textarea.val('')
					scope.json = ""
					cellY++
				return

			scope.deleteCharacter = ($event) ->
				#needed to capture delete key
				$timeout () ->
					cellText = scope.editorStatusMatrix[cellY].string
					key = $event.keyCode || $event.charCode
					if( key isnt 8 and key isnt 46 )
						return
					#backspace case
					removedCharsNumber = cellText.length -  scope.json.length
					removedChars = cellText.substring(cellX - removedCharsNumber, cellX)
					newLinesNum = _.countBy removedChars, (char) ->
						return char is '\n'
					
					if (scope.editorStatusMatrix[cellY].string - removedCharsNumber) <= 0
						scope.editorStatusMatrix[cellY].string = ""
						scope.editorStatusMatrix[cellY].isNew = true
					else
						#concatenate two strings: one from zero to the cursor's position and then from the cursor's position to the end of the string
						scope.editorStatusMatrix[cellY].string = scope.json = cellText.substring(0, cellX - removedCharsNumber) + cellText.substring(cellX, cellText.length)
				
					cellY -= newLinesNum.true if newLinesNum.true
					scope.carelPos.top -= cellHeight*newLinesNum.true
					#the .false are the non newline chars
					scope.carelPos.left -= cellWidth*newLinesNum.false
					cellX -= newLinesNum.false
					if cellX < 0
						#if it is going out of the screen
						cellX = 0
					return
				return

			scope.initCursor = (cursorId) ->
				$interval( () ->
					scope.hideCursor = !scope.hideCursor
					return
				, 500)

			angular.element(document).ready () ->
				scope.editor.initEditor()
				scope.initCursor('cursor')
				
				return

			return
	]
	return
